package com.example.P1B.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity // 엔티티 생성시
@Getter
@Setter
@Builder // 추후 Builder 사용시
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "MEMBER")
public class Member {

    // 회원 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "MEM_ID", columnDefinition = "BINARY(36)")
    private UUID id;

    // 회원 아이디
    @Column(name = "MEM_USERID", nullable = false)
    private String memUserid;

    // 회원 닉네임
    @Column(name = "MEM_NAME", nullable = false)
    private String memName;

    // 회원 비밀번호
    @Column(name = "MEM_PASSWD", nullable = false)
    private String memPasswd;

    // 회원 이메일
    @Column(name = "MEM_EMAIL", nullable = false)
    private String memEmail;

    // 회원 정보
    @Column(name = "MEMBER_ROLE")
    private String role;

    // 회원 탈퇴 여부
    @Column(name = "MEM_RESIGNED", nullable = false)
    private String resigned = String.valueOf('N');

    // 회원 생성일
    @Column(name = "MEM_CRT_DATE", updatable = false, nullable = false)
    private LocalDateTime memCrtDate;

    // 회원 수정일
    @Column(name = "MEM_UDT_DATE", nullable = false)
    private LocalDateTime memUdtDate;

    // Email
//    @OneToMany(mappedBy = "member")
//    @Column
//    private List<Email> vrId = new ArrayList<>();

    // front에서 받아온 유저정보를 담는 객체
    public Member(String memUserid, String memName, String memPasswd, String memEmail, String role) {
        this.memUserid = memUserid;
        this.memName = memName;
        this.memPasswd = memPasswd;
        this.memEmail = memEmail;
        this.role = role;
        this.memCrtDate = LocalDateTime.now();
        this.memUdtDate = LocalDateTime.now();
    }
}
