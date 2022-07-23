package com.cognizant.repos;

import com.cognizant.models.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AuthDAO extends JpaRepository<Auth, Integer> {
    Optional<Auth> findByEmail(String email);
}
