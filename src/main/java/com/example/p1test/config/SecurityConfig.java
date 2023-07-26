package com.example.p1test.config;

import com.example.p1test.domain.Role;
import com.example.p1test.handler.AuthSuccessHandler;
import com.example.p1test.service.CustomizeUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomizeUserDetailsService customizeUserDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customizeUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/member/join", "/member/email-check", "/member/id-check", "/member/list").permitAll()
                .antMatchers("/member/**").hasAuthority(Role.MEMBER.getValue())
                .antMatchers("/guest/**").hasAuthority(Role.ANONYMOUS.getValue())
                .and()
                .formLogin()
                .loginPage("/member/login")
                .permitAll()
                .successHandler(new AuthSuccessHandler()) // 성공 핸들러 사용 설정
                .failureUrl("/member/login?error") // 로그인 실패 시
                .and()
                .logout()
                .logoutUrl("/member/logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessUrl("/");

    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
