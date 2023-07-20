package com.example.P1B.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class MainController {

    @GetMapping("/index")
    public String home() {
        return "index";
    }

    //로그인 기능
    // 작성자 : 장재형
    @GetMapping("/users/login/login")
    public String login() {
        return "/users/text";
    }
    // 회원가입 기능
    // 작성자 : 장재형
    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }

    // 로그아웃 기능
    // 작성자 : 장재형
    @GetMapping("/users/login/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
//        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/users/login";
    }
}
