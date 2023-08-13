package com.example.P1B.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupDTO {
    private String username;
    private String userpassword;
    private String usernickname;
    private String useremail;
    private int code;
}