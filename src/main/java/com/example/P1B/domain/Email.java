package com.example.P1B.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "EMAIL_VERFICATION")
@Entity
public class Email {

    // 이메일 인증 고유 식별 ID
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "VR_ID", columnDefinition = "VARCHAR(36)")
    private UUID vrId;

    // 이메일 인증 코드
    private int vrAuthCode;

    // 이메일 인증 여부
    private int vrStatus;

    // 이메일 인증 시작 시간
    private LocalDateTime vrCreate;

    // 이메일 인증 종료 시간
    private LocalDateTime vrExpire;

    // 회원 고유 식별 ID
    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;
}
