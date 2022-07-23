package com.cognizant.controllers;

import com.cognizant.models.Auth;
import com.cognizant.models.AuthDTO;
import com.cognizant.models.RegisterDTO;
import com.cognizant.models.User;
import com.cognizant.services.AuthService;
import com.cognizant.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RestController
@CrossOrigin
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final AuthService authService;
    @Autowired
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@Valid @RequestBody AuthDTO user){
        HttpHeaders responseHeaders = new HttpHeaders();
        String token = authService.login(user);
        User currUser = userService.getUserByEmail(user.getEmail());
        if(token != null) {
            List<String> headersToExpose = new ArrayList<>();
            headersToExpose.add("token");
            responseHeaders.setAccessControlExposeHeaders(headersToExpose);
            responseHeaders.set("token", token);
            return ResponseEntity.status(200).headers(responseHeaders).body(currUser);
            //return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(currUser);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        //return new ResponseEntity<>(responseHeaders, HttpStatus.OK).;
        //return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @PostMapping
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegisterDTO user) {
            User registeredUser = userService.saveUser(new User(
                        user.getEmail().toLowerCase(Locale.ROOT),
                        user.getFirstName(),
                        user.getLastName()
                ));

            if(registeredUser != null) {
                //AuthDTO authDTO = new AuthDTO(registeredUser.getUser_id(), user.getEmail(), user.getPassword());
                Auth authUser = authService.saveAuthUser(new Auth(registeredUser.getUser_id(), user.getEmail(), user.getPassword()));
                if(authUser != null) {
                   return ResponseEntity.status(HttpStatus.CREATED).build();
                }
            }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
