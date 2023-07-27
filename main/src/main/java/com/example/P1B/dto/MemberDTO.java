package com.example.P1B.dto;

import com.example.P1B.domain.Member;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberDTO {
    private Long id;
    private String memberId;
    private String memberPassword;
    private String memberName;
    private String memberEmail;
    private Member.Role role;

    public static MemberDTO toMemberDTO(Member member) {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(member.getId());
        memberDTO.setMemberId(member.getMemberId());
        memberDTO.setMemberPassword(member.getMemberPassword());
        memberDTO.setMemberName(member.getMemberName());
        memberDTO.setMemberEmail(member.getMemberEmail());
        return memberDTO;
    }
}
