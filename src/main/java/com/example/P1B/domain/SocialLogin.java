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
@Table(name = "SOCIAL_LOGINS")
@Entity
public class SocialLogin {

    //소셜 회원 고유 식별 ID
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "SL_ID", columnDefinition = "VARCHAR(36)")
    private UUID slId;

    // 소셜 아이디
    private String slUserid;

    // 소셜 닉네임
    private String slNickname;

    // 소셜 로그인 종류
    private int slPlatform;

    // 소셜 액세스 토큰
    private String slAccesstoken;

    // 소셜 만료 토큰
    private LocalDateTime slExpires;

    // 회원 고유 식별 ID
    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;
}
