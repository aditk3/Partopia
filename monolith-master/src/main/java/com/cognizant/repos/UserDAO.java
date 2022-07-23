package com.cognizant.repos;

import com.cognizant.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {
    Optional<User> findById(int id);
    Optional<User> findByEmail(String email);
}