package com.cognizant.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Auth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 50, nullable = false)
    private String email;
    @Column(nullable = false)
    @Size(min = 3)
    private String password;


    public Auth(int id, String email) {
        this.id = id;
        this.email = email;
    }

    public Auth(String email, String password) {
        this.id = id;
        this.email = email;
    }
}
