package com.example.p1test.service;

import com.example.p1test.domain.Member;
import com.example.p1test.dto.MemberDTO;
import com.example.p1test.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder; // 빈으로 주입

    public void join(MemberDTO memberDTO) {
        // 1. dto -> entity 변환
        // 2. repository의 join 메서드 호출
        Member member = Member.toMember(memberDTO);
        member.setMemberPassword(passwordEncoder.encode(member.getMemberPassword()));
        member.setRole(Member.Role.USER);
        memberRepository.save(member);
        // repository의 join메서드 호출 (조건. entity객체를 넘겨줘야 함)
    }

    public MemberDTO login(MemberDTO memberDTO) {
        /*
            1. 회원이 입력한 이메일로 DB에서 조회를 함
            2. DB에서 조회한 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 판단
         */
        Optional<Member> byMemberId = memberRepository.findByMemberId(memberDTO.getMemberId());
        if (byMemberId.isPresent()) {
            // 조회 결과가 있다(해당 이메일을 가진 회원 정보가 있다)
            Member member = byMemberId.get();
            if (member.getMemberPassword().equals(memberDTO.getMemberPassword())) {
                // 비밀번호 일치
                // entity -> dto 변환 후 리턴
                MemberDTO dto = MemberDTO.toMemberDTO(member);
                return dto;
            } else {
                // 비밀번호 불일치(로그인실패)
                return null;
            }
        } else {
            // 조회 결과가 없다(해당 이메일을 가진 회원이 없다)
            return null;
        }
    }

    public List<MemberDTO> findAll() {
        List<Member> memberList = memberRepository.findAll();
        List<MemberDTO> memberDTOList = new ArrayList<>();
        for (Member member: memberList) {
            memberDTOList.add(MemberDTO.toMemberDTO(member));
//            MemberDTO memberDTO = MemberDTO.toMemberDTO(member);
//            memberDTOList.add(memberDTO);
        }
        return memberDTOList;
    }

    public MemberDTO findById(Long id) {
        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isPresent()) {
//            Member member = optionalMember.get();
//            MemberDTO memberDTO = MemberDTO.toMemberDTO(member);
//            return memberDTO;
            return MemberDTO.toMemberDTO(optionalMember.get());
        } else {
            return null;
        }

    }

    public MemberDTO updateForm(String myEmail) {
        Optional<Member> optionalMember = memberRepository.findByMemberId(myEmail);
        if (optionalMember.isPresent()) {
            return MemberDTO.toMemberDTO(optionalMember.get());
        } else {
            return null;
        }
    }

    public void update(MemberDTO memberDTO) {
        memberRepository.save(Member.toUpdateMember(memberDTO));
    }

    public void deleteById(Long id) {
        memberRepository.deleteById(id);
    }

    // 이메일 체크
    public String emailCheck(String memberEmail) {
        Optional<Member> byMemberEmail = memberRepository.findByMemberId(memberEmail);
        if (byMemberEmail.isPresent()) {
            // 조회결과가 있다 -> 사용할 수 없다.
            return null;
        } else {
            // 조회결과가 없다 -> 사용할 수 있다.
            return "ok";
        }
    }

    // 아이디 체크
    public String idCheck(String memberId) {
        Optional<Member> byMemberId = memberRepository.findByMemberId(memberId);
        if (byMemberId.isPresent()) {
            // 조회결과가 있다 -> 사용할 수 없다.
            return null;
        } else {
            // 조회결과가 없다 -> 사용할 수 있다.
            return "ok";
        }
    }

    public String findIdByEmail(String memberEmail) {
        return memberRepository.findByMemberEmail(memberEmail).map(Member::getMemberId).orElse(null);
    }

    public boolean checkMemberIdAndEmail(String memberId, String memberEmail) {
        return memberRepository.findByMemberIdAndMemberEmail(memberId, memberEmail).isPresent();
    }

    public void changePassword(String memberId, String newPassword) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();
        member.setMemberPassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);
    }
}