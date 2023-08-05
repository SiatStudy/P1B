package com.example.P1B.service;

import com.example.P1B.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.swing.*;
import java.util.Collection;
import java.util.Collections;


// 작성자 : 장재형

// UserDetails 인터페이스를 구현
// CustomizeUserDetails 클래스
public class CustomizeUserDetails implements UserDetails {


    // UserDetails: 스프링 시큐리티에서 인증과 권한 부여를 위해 사용되는 인터페이스

    // 유저 정보 객체
    private final User user;

    // 생성자
    public CustomizeUserDetails(User user) {
        this.user = user;
    }


    // 권한 정보
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()));
    }

    
    // 비밀번호 반환
    @Override
    public String getPassword() {
        return user.getUserPassword();
    }

    
    // 유저 아이디 반환
    @Override
    public String getUsername() {
        return user.getUsername();
    }

    // 유저 이름 반환
    // Member 객체를 반환
    public User getUser(){return user;}

    // 계정 만료 여부
    // 계정이 만료되지 않았음을 반환
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정 잠김 여부
    // 계정이 잠기지 않았음을 반환
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 사용자 인증 정보 만료 여부
    // 사용자 인증 정보(비밀번호)가 만료되지 않았음을 반환
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정 활성화 여부
    // 계정이 활성화 됨을 반환
    @Override
    public boolean isEnabled() {
        return true;
    }

}
