package com.example.P1B.handler;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

public class AuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String message;
// 에러에 대한 처리. 여길 타면 반강제로 302가 뜬다.
        // 엑시오스에서 지원하는 302 처리를 200으로 바꿔주는 경우가 있음
        // 아니면 컨트롤러에서 302를 200으로 변환해서 내려줘야 함.
        if(exception instanceof BadCredentialsException) {
            message = "아이디 or 비밀번호 불일치";
        }else if(exception instanceof InternalAuthenticationServiceException){
            message = "시스템 문제 발생";
        }else if(exception instanceof UsernameNotFoundException){
            message ="계정이 없음";
        }else if(exception instanceof AuthenticationCredentialsNotFoundException){
            message ="인증 요청 실패";
        }else{
            message ="이유 모름";
        }
        message = URLEncoder.encode(message, "UTF-8");
        setDefaultFailureUrl("/login/login?error=true&exception=" + message);
        super.onAuthenticationFailure(request, response, exception);
    }


}