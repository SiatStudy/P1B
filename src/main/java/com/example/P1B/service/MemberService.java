package com.example.P1B.service;

import com.example.P1B.domain.Member;
import com.example.P1B.dto.MemberDTO;
import com.example.P1B.exception.MemberNotFoundException;
import com.example.P1B.repository.MemberRepository;
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
        Optional<Member> result = memberRepository.findByUsername(myEmail);
        if (result.isPresent()) {
            return MemberDTO.toMemberDTO(result.get());
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
        Optional<Member> result = memberRepository.findByUsername(memberEmail);
        if (result.isPresent()) {
            // 조회결과가 있다 -> 사용할 수 없다.
            return null;
        } else {
            // 조회결과가 없다 -> 사용할 수 있다.
            return "ok";
        }
    }

    // 아이디 체크
    public String idCheck(String username) {
        Optional<Member> result = memberRepository.findByUsername(username);
        if (result.isPresent()) {
            // 조회결과가 있다 -> 사용할 수 없다.
            return null;
        } else {
            // 조회결과가 없다 -> 사용할 수 있다.
            return "ok";
        }
    }

//    public String findIdByEmail(String memberEmail) {
//        return memberRepository.findByMemberEmail(memberEmail).map(Member::getUsername).orElse(null);
//    }

    public Optional<String> findIdByEmail(String memberEmail) {
        Optional<Member> memberOptional = memberRepository.findByMemberEmail(memberEmail);

        return memberOptional.map(Member::getUsername);
    }


    public void changePassword(String username, String newPassword) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new MemberNotFoundException("해당 아이디를 찾을 수 없습니다."));
        member.setMemberPassword(newPassword);
        memberRepository.save(member);
    }

    public String findMemberByUsernameAndEmail(String username, String memberEmail) {
        Member member = memberRepository.findByUsernameAndMemberEmail(username, memberEmail); // 수정된 부분

        if (member == null) {
            throw new MemberNotFoundException("해당하는 아이디 또는 이메일이 존재하지 않습니다.");
        }

        return member.getUsername(); // 수정된 부분
    }

}