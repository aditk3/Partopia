package com.cognizant.PartyService;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PartyRepo extends CrudRepository<Party, Long> { }
