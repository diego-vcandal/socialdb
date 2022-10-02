package es.diegovcandal.socialdb.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import es.diegovcandal.socialdb.domain.Authority;

@Repository
public interface CustomAuthorityRepository extends PagingAndSortingRepository<Authority, String> {

}
