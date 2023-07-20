package com.example.P1B.dto;

import com.example.P1B.domain.Member;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberDTO {

    // 고유 아이디
    private UUID id;

    // 유저 아이디
    private String memId;

    // 유저 비밀번호
    private String memPw;

    // 유저 이름
    private String memName;

    // 유저 이메일
    private String memEmail;

    public void encryptPassword(String BCryptpassword){
        this.memPw = BCryptpassword;
    }

    public Member toEntity() {
        Member member = Member.builder()
                .id(id)
                .memUserid(memId)
                .memName(memName)
                .memPasswd(memPw)
                .memEmail(memEmail)
                .memCrtDate(LocalDateTime.now())
                .memUdtDate(null)
                .build();
        return member;
    }
    public static MemberDTO mDTO(Member member){
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(member.getId());
        memberDTO.setMemId(member.getMemUserid());
        memberDTO.setMemPw(member.getMemPasswd());
        memberDTO.setMemName(member.getMemName());
        return memberDTO;
    }

}
//    public MemberInDTO(Member member){
//        this.memId = member.getMemId();
//        this.memPw = member.getMemPw();
//        this.memEmail = member.getMemEmail();
//    }

