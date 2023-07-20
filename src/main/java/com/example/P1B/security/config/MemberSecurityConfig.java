package security1.security.config;

import com.example.P1B.security.config.MemberAuthFailureHandler;
import com.example.P1B.security.provider.MemberAuthenticatorProvider;
import com.example.P1B.service.MemberPrincipalDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class MemberSecurityConfig {

    @Autowired
    MemberAuthenticatorProvider memberAuthenticatorProvider;

    @Autowired
    MemberPrincipalDetailService memberPrincipalDetailService;


    @Autowired
    public void configure (AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(memberAuthenticatorProvider);
    }

    // 5.7.0 부터 Override 하지 않고
    // SecurityFilterChain을 직접 생성하여 구현
    // 그 외 authorizeRequests 가 deprecated 되었기 때문에
    // authorizeHttpRequests 로 변경
    @Bean
    public SecurityFilterChain memberSecurityFilterChain (HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.authorizeHttpRequests(authorize -> {
            try {
                authorize
                        .requestMatchers("/css/**", "/images/**", "/js/**", "/member/login/**", "/member/attachment/**", "/member/files/**")
                        .permitAll() // 해당 경로는 인증 없이 접근 가능
                        .requestMatchers("/member/**") // 해당 경로는 인증이 필요
                        .hasRole("MEMBER") // ROLE 이 MEMBER 가 포함된 경우에만 인증 가능
                        .and()
                        .formLogin()
                        .loginPage("/member/login/loginForm") // 로그인 페이지 설정
                        .loginProcessingUrl("/member/login/login") // 로그인 처리 URL 설정
                        .defaultSuccessUrl("/member/main") // 로그인 성공 후 이동할 페이지
//                        .successHandler(new MemberAuthSuccessHandler()) // 로그인 성공 후 처리할 핸들러
                        .failureHandler(new MemberAuthFailureHandler()) // 로그인 실패 후 처리할 핸들러
                        .permitAll()
                        .and()
                        .logout()
                        .logoutUrl("/member/login/logout") // 로그아웃 처리 URL 설정
                        .logoutSuccessUrl("/member/login/loginForm?logout=1") // 로그아웃 성공 후 이동할 페이지
                        .deleteCookies("JSESSIONID"); // 로그아웃 후 쿠키 삭제
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });

        return http.build();
    }
}
