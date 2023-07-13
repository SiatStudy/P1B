package com.example.P1B;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

    @Configuration
    // 스프링 환경 설정 파일 어노테이션 선언
    @EnableWebSecurity
    // 모든 요청 URL이 스프링 시큐리티의 제어를 받도록 선언.
    public class SecurityConfig {
        @Bean
        SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http.authorizeHttpRequests().requestMatchers(
                    new AntPathRequestMatcher("/**")).permitAll();
            // 모든 인증되지 않은 요청을 허락하는 선언, 즉 로그인 없이 접근 가능하도록 허용.
            return http.build();
        }
    }