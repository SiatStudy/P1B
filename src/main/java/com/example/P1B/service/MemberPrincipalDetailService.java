package com.example.P1B.service;

import com.example.P1B.domain.Member;
import com.example.P1B.repository.MemberRepository;
import com.example.P1B.security.auth.MemberPrincipalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// UserDetailsService 를 구현한 클래스
@Service
public class MemberPrincipalDetailService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 넘겨받은 id 로 DB 에서 회원 정보를 찾음
        Member result = memberRepository.findByMemUserid(username);
        System.out.println("username : " + username);
        System.out.println("member : " + result);

        List<GrantedAuthority> authorities = new ArrayList<>();

        // 회원 정보가 DB에 있는 경우 'ROLE_USER' 권한 부여


        if(result == null) {
            // 회원 정보가 DB에 없는 경우 'ROLE_ANONYMOUS' 권한 부여
            authorities.add(new SimpleGrantedAuthority("ANONYMOUS"));
            throw new UsernameNotFoundException(username + "을 찾을 수 없습니다.");
        }

        if (!"N".equals(result.getResigned()))
            throw new UsernameNotFoundException("삭제된 계정입니다.");


        // MemberPrincipalDetails 에 Member 객체를 넘겨줌
        authorities.add(new SimpleGrantedAuthority("MEMBER"));
        return new MemberPrincipalDetails(result, authorities);
    }
}
