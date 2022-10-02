package es.diegovcandal.socialdb.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import es.diegovcandal.socialdb.domain.Authority;
import es.diegovcandal.socialdb.domain.User;
import es.diegovcandal.socialdb.repository.UserDetailsRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDetailsRepository userDetailsRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

		Optional<User> user = userDetailsRepository.findById(id);

		if (user.isEmpty()) {
			throw new UsernameNotFoundException("User id not fount: " + id);
		}

		Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
		for (Authority authority : user.get().getAuthorities()) {
			GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(authority.getName());
			grantedAuthorities.add(grantedAuthority);
		}

		return new org.springframework.security.core.userdetails.User(user.get().getId(), user.get().getPassword(),
				grantedAuthorities);
	}

	@Transactional
	public User create(User user) throws UsernameNotFoundException {

		User newUser = null;
		Optional<User> foundUser = userDetailsRepository.findById(user.getId());

		if (foundUser.isPresent()) {
			newUser = foundUser.get();
			newUser.setUsername(user.getUsername());
			return userDetailsRepository.save(newUser);
		}

		return userDetailsRepository.save(user);

	}

}
