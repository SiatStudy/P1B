package com.example.P1B.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "email")
public class Email {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VR_ID", nullable = false)
    private Long vrId;

    // 이메일 인증 코드
    @Column(name = "VR_AUTH_CODE", nullable = false, length = 11)
    private int vrAuthCode;

    // 이메일 인증 시작 시간
    @Column(name = "VR_CREATE", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime vrCreate;

    // 이메일 인증 종료 시간
    @Column(name = "VR_EXPIRE", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime vrExpire;

    @Column(name = "MEM_USERID")
    private String username;
}
