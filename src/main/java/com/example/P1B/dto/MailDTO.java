package com.example.P1B.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MailDTO {
    private String useremail;
    private String username;
    private int code;
}
