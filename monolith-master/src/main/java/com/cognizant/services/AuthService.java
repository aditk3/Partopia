package com.cognizant.services;

import com.cognizant.models.Auth;
import com.cognizant.models.AuthDTO;
import com.cognizant.repos.AuthDAO;
import com.cognizant.utils.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private final AuthDAO authDAO;

    public String login(AuthDTO user) {
       Auth authUser = getUserByEmail(user.getEmail().toLowerCase(Locale.ROOT));
       if(authUser != null && checkPw(user.getPassword(), authUser.getPassword())) {
           return JWT.generateToken(authUser);
       } else {
           return null;
       }
    }

    public Auth getUserByEmail(String email) {
        Optional<Auth> user = authDAO.findByEmail(email.toLowerCase(Locale.ROOT));
        if(user.isPresent()){
            return user.get();
        }
        return null;
    }

    public Auth saveAuthUser(Auth user) {
        user.setPassword(hashedPw(user.getPassword()));
        user.setEmail(user.getEmail().toLowerCase(Locale.ROOT));
        try{
            return authDAO.save(user);
        }catch(Exception e){
            return null;
        }
    }

    private String hashedPw(String password){
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    private boolean checkPw(String password, String hash) {
        return BCrypt.checkpw(password, hash);
    }

}
