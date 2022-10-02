package es.diegovcandal.socialdb.oauth2;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestOperations;

import es.diegovcandal.socialdb.application.AppConfig;
import es.diegovcandal.socialdb.domain.Authority;
import es.diegovcandal.socialdb.domain.User;
import es.diegovcandal.socialdb.repository.CustomAuthorityRepository;
import es.diegovcandal.socialdb.service.CustomUserDetailsService;

@Component
@Configurable
public class RestOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private AppConfig appConfig;
	private RestOperations restOperations;
	private CustomAuthorityRepository authorityRepository;
	private CustomUserDetailsService customUserDetailsService;

	public RestOAuth2UserService(RestOperations restOperations, AppConfig appConfig,
			CustomAuthorityRepository authorityRepository, CustomUserDetailsService customUserDetailsService) {
		this.restOperations = restOperations;
		this.appConfig = appConfig;
		this.authorityRepository = authorityRepository;
		this.customUserDetailsService = customUserDetailsService;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		String userInfoUrl = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUri();

		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.AUTHORIZATION,
				String.format("Bearer %s", userRequest.getAccessToken().getTokenValue()));
		headers.set(HttpHeaders.USER_AGENT, appConfig.getUserAgent());
		ParameterizedTypeReference<Map<String, Object>> typeReference = new ParameterizedTypeReference<Map<String, Object>>() {
		};

		ResponseEntity<Map<String, Object>> responseEntity = restOperations.exchange(userInfoUrl, HttpMethod.GET,
				new HttpEntity<>(headers), typeReference);

		Map<String, Object> userAttributes = responseEntity.getBody();
		Set<GrantedAuthority> authorities = Collections.singleton(new OAuth2UserAuthority(userAttributes));

		Set<Authority> userAuthorities = new HashSet<>();
		for (GrantedAuthority authority : authorities) {
			Authority au = new Authority(authority.getAuthority());
			userAuthorities.add(authorityRepository.save(au));
		}

		customUserDetailsService.create(
				new User(userAttributes.get("id").toString(), userAttributes.get("name").toString(), userAuthorities));

		return new DefaultOAuth2User(authorities, userAttributes, userRequest.getClientRegistration()
				.getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName());
	}
}
