package com.example.P1B.controller;

import com.example.P1B.exception.MemberNotFoundException;
import com.example.P1B.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final MemberService memberService;

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }
    @PostMapping("/duple/id")
    public @ResponseBody boolean idCheck(@RequestBody String username) {
        return !memberService.idCheck(username);
    }

    @PostMapping("/duple/email")
    public @ResponseBody boolean emailCheck(@RequestBody String memberEmail) {
        return memberService.emailCheck(memberEmail);
    }

    @GetMapping("/search/id")
    public String findIdForm() {
        return "findId";
    }


    @PostMapping("/search/id")
    public String findId(@RequestParam("memberEmail") String memberEmail, Model model) {
        // 서비스 메소드 호출
        Optional<String> optionalUsername = memberService.findIdByEmail(memberEmail);

        if (optionalUsername.isPresent()) {
            String username = optionalUsername.get();
            String message = "찾으신 아이디는: " + username;
            System.out.println("id : " + username);
            System.out.println("find Id 값 : " + message);
            model.addAttribute("resultMessage", message);
        } else {
            String message = "해당 아이디를 찾을 수 없습니다.";
            System.out.println("find Id 값 : " + message);
            model.addAttribute("resultMessage", message);
        }
        System.out.println("id : " + optionalUsername);

        return "findIdResult";
    }

    @GetMapping("/search/password")
    public String findPasswordForm() {
        return "findPassword";
    }

    @PostMapping("/search/password")
    public String findPassword(@RequestParam("username") String username, @RequestParam("memberEmail") String memberEmail, Model model) {
        try {
            //서비스 메소드 호출 후, 새 비밀번호 변경 페이지로 이동
            String result = memberService.findMemberByUsernameAndEmail(username, memberEmail);
            model.addAttribute("username", result);
            return "changePassword";
        } catch (MemberNotFoundException e) {
            // 이메일이나 아이디가 존재하지 않을 경우 에러 메시지를 반환
            model.addAttribute("errorMessage", e.getMessage());
            return "findPassword";
        }
    }
}
