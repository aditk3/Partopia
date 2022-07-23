package com.cognizant.services;

import com.cognizant.models.User;
import com.cognizant.repos.UserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserDAO userDAO;

    public User getUserById(int id) {
        Optional<User> user = userDAO.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        return null;
    }

    public User getUserByEmail(String email) {
        Optional<User> user = userDAO.findByEmail(email.toLowerCase(Locale.ROOT));
        if(user.isPresent()){
            return user.get();
        }
        return null;
    }

    public User saveUser(User user){
        try{
            return userDAO.save(user);
        }catch (Exception e){
            return null;
        }
    }

    public List<User> getAllUsers(){
        return userDAO.findAll();
    }
}
