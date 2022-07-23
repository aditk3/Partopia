package com.cognizant.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
@Table(name = "user_table")
@AllArgsConstructor
@NoArgsConstructor
public class User {

    public User(String email, String firstName, String lastName) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.img = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpaperaccess.com%2Fcool-profile-pictures&psig=AOvVaw1qDirK_dm7ZC_QKc5DNnVN&ust=1652981252076000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCPCfzpTJ6fcCFQAAAAAdAAAAABAD";

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    @Email
    @Column(unique = true, nullable = false, length = 50)
    private String email;
    @Column(length = 50)
    @NotBlank
    private String firstName;
    @Column(length = 50)
    @NotBlank
    private String lastName;
//    @Lob
    private String img;
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name="user_parties",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name="party_id", referencedColumnName = "id")}
    )
    @JsonIgnoreProperties("attendees")
    private List<Party> parties;
}
