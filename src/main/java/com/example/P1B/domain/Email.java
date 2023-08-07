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
    // 이메일 인증 고유 식별 ID

    private static final Long MAX_EXPIRE_TIME = 5L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VR_ID", nullable = false)
    private Long vrId;

    // 이메일 인증 코드
    @Column(name = "VR_AUTH_CODE", nullable = false, length = 11)
    private int vrAuthCode;

    // 이메일 인증 여부
    @Column(name = "VR_STATUS", nullable = false, length = 4)
    private int vrStatus = 0;

    // 이메일 인증 시작 시간
    @Column(name = "VR_CREATE", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime vrCreate;

    // 이메일 인증 종료 시간
    @Column(name = "VR_EXPIRE", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime vrExpire;

    // 회원 고유 식별 ID
    @ManyToOne
    @JoinColumn(name = "mem_id")
    private User user;


//    @Builder
//    public Email(String)
}
