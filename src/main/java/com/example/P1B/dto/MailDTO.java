package com.example.P1B.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 작성자 : 장재형

@Getter
@Setter
@NoArgsConstructor
public class MailDTO {
    // 메일 주소
    private String address;
    
    // 메일 제목
    private String title;
    
    // 메일 내용
    private String content;
}
