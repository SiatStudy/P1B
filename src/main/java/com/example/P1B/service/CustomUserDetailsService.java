package com.example.P1B.service;

import com.example.P1B.domain.Member;
import com.example.P1B.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Member member = memberRepository.findByMemberId(id).orElseThrow(
                () -> new UsernameNotFoundException("Id not found: " + id));

        UserDetails userDetails = User.withUsername(member.getMemberId())
                .password(member.getMemberPassword())
                .authorities(member.getRole().name())
                .build();

        httpSession.setAttribute("email", member.getMemberEmail()); // 세션에 이메일 저장
        return userDetails;
    }
}
