package com.example.P1B.service;

import com.example.P1B.domain.Member;
import com.example.P1B.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public void saveMember(String memUserid, String memName, String memPasswd, String memEmail, String role){
        Member member = new Member(memUserid, memName, memPasswd, memEmail, role);
        Member smember = memberRepository.save(member);
    }
}
