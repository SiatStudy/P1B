package com.example.P1B.domain;

import com.example.P1B.dto.MemberDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
@Setter
@Getter
@Table(name = "member")
public class Member {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    @Column(name = "MEM_ID")
    private Long id;

    // 실제 아이디 값(스프링 시큐리티 때문에 MEMBER_ID에서 USERNAME으로 바꿨습니다.)
    // 아이디 : 영문 + 8자리
    @Column(unique = true, nullable = false, name = "MEM_USERID", length = 50) // unique 제약조건 추가
    private String username;

    // 이름(닉네임)
    // 올 숫자만 불가, 15자리 이하로 설정(한글, 영어 자율)
    @Column(name = "MEM_NAME", nullable = false,length = 50)
    private String memberName;

    // 비밀번호 값
    // 비밀번호 : ! @ # $ % 특문 중 1글자 포함 + 영문 최소 1글자 포함 + 숫자 포함(총 최소 8자리 이상)
    @Column(name = "MEM_PASSWD", nullable = false, length =80)
    private String memberPassword;


    @Column(unique = true, nullable = false, name = "MEM_EMAIL", length = 130) // unique 제약조건 추가
    private String memberEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEM_ROLE")
    private Role role;

    @Column(name = "MEM_CRT_DATE", nullable = false, updatable = false)
    @CreatedDate // Entity 생성 시

    private LocalDateTime memCrtDate;

    @Column(name = "MEM_UDT_DATE")
    private LocalDateTime memUdtDate;

    public enum Role{
        USER, ANONYMOUS
    }




    public static Member toMember(MemberDTO memberDTO) {
        Member member = new Member();
        member.setUsername(memberDTO.getUsername());
        member.setMemberPassword(memberDTO.getMemberPassword());
        member.setMemberName(memberDTO.getMemberName());
        member.setMemberEmail(memberDTO.getMemberEmail());
        member.setMemCrtDate(secDate(LocalDateTime.now()));
        return member;
    }

    public static Member toUpdateMember(MemberDTO memberDTO) {
        Member member = new Member();
        member.setId(memberDTO.getId());
        member.setUsername(memberDTO.getUsername());
        member.setMemberPassword(memberDTO.getMemberPassword());
        member.setMemberName(memberDTO.getMemberName());
        member.setMemberEmail(memberDTO.getMemberEmail());
        member.setMemUdtDate(secDate(LocalDateTime.now()));
        return member;
    }

    public static LocalDateTime secDate(LocalDateTime dateTime) {
        return dateTime.truncatedTo(ChronoUnit.SECONDS);
    }

}
