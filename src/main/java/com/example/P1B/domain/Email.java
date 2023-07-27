package com.example.P1B.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "email")
public class Email {
    // 이메일 인증 고유 식별 ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vrid;

    // 이메일 인증 코드
    @Column
    private int vrauthcode;

    // 이메일 인증 여부
    @Column
    private int vrstatus = 0;

    // 이메일 인증 시작 시간
    @Column
    private LocalDateTime vrcreate;

    // 이메일 인증 종료 시간
    @Column
    private LocalDateTime vrexpire;

    // 회원 고유 식별 ID
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
