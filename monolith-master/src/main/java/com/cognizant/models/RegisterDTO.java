package com.cognizant.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {

    @Email
    @NotEmpty
    private String email;
    @Size(min=3, max=18)
    private String password;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;



}
