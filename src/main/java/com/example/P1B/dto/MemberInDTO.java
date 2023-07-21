package com.example.P1B.dto;

import lombok.Data;

@Data
public class MemberInDTO {
    private String memUserid;
    private String memName;
    private String memPasswd;
    private String memEmail;
    private String role;
}
