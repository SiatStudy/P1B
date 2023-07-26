package com.example.p1test.domain;

import com.example.p1test.dto.MemberDTO;
import lombok.Getter;
import lombok.Setter;

import javax.management.relation.Role;
import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "member")
public class Member {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private Long id;

    @Column(unique = true) // unique 제약조건 추가
    private String memberId;

    @Column
    private String memberPassword;

    @Column
    private String memberName;

    @Column(unique = true) // unique 제약조건 추가
    private String memberEmail;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role{
        USER, ADMIN
    }


    public static Member toMember(MemberDTO memberDTO) {
        Member member = new Member();
        member.setMemberId(memberDTO.getMemberId());
        member.setMemberPassword(memberDTO.getMemberPassword());
        member.setMemberName(memberDTO.getMemberName());
        member.setMemberEmail(memberDTO.getMemberEmail());
        return member;
    }

    public static Member toUpdateMember(MemberDTO memberDTO) {
        Member member = new Member();
        member.setId(memberDTO.getId());
        member.setMemberId(memberDTO.getMemberId());
        member.setMemberPassword(memberDTO.getMemberPassword());
        member.setMemberName(memberDTO.getMemberName());
        member.setMemberEmail(memberDTO.getMemberEmail());
        return member;
    }
}
