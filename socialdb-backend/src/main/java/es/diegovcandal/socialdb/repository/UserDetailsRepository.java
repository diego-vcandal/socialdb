package es.diegovcandal.socialdb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.diegovcandal.socialdb.domain.User;

@Repository
public interface UserDetailsRepository extends PagingAndSortingRepository<User, String> {

	@Override
	@Query("SELECT u FROM User u WHERE LOWER(u.id) = LOWER(:id)")
	Optional<User> findById(@Param("id") String username);

}
