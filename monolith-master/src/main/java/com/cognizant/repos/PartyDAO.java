package com.cognizant.repos;

import com.cognizant.models.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyDAO extends JpaRepository<Party, Integer> {
}
