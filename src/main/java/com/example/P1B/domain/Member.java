package com.example.P1B.domain;

import com.example.P1B.dto.MemberDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    @Column(unique = true, name = "MEM_USERID") // unique 제약조건 추가
    private String username;

    // 비밀번호 값
    @Column(name = "MEM_PASSWD")
    private String memberPassword;

    // 이름(닉네임)
    @Column(name = "MEM_NAME")
    private String memberName;

    @Column(unique = true, name = "MEM_EMAIL") // unique 제약조건 추가
    private String memberEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEM_ROLE")
    private Role role;

    @Column(name = "MEM_CRT_DATE", nullable = false, updatable = false)
    @CreatedDate // Entity 생성 시
    private LocalDateTime memCrtDate = LocalDateTime.now();

    @Column(name = "MEM_UDT_DATE")
    private LocalDateTime memUdtDate;


    @OneToMany(mappedBy = "member")
    private List<Email> vrid = new ArrayList<>();

    public enum Role{
        USER, ANONYMOUS
    }


    public static Member toMember(MemberDTO memberDTO) {
        Member member = new Member();
        member.setUsername(memberDTO.getUsername());
        member.setMemberPassword(memberDTO.getMemberPassword());
        member.setMemberName(memberDTO.getMemberName());
        member.setMemberEmail(memberDTO.getMemberEmail());
        return member;
    }

    public static Member toUpdateMember(MemberDTO memberDTO) {
        Member member = new Member();
        member.setId(memberDTO.getId());
        member.setUsername(memberDTO.getUsername());
        member.setMemberPassword(memberDTO.getMemberPassword());
        member.setMemberName(memberDTO.getMemberName());
        member.setMemberEmail(memberDTO.getMemberEmail());
        return member;
    }
}
