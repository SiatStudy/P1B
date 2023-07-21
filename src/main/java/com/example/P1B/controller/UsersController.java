package com.example.P1B.controller;

import com.example.P1B.dto.MemberInDTO;
import com.example.P1B.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/users")
public class UsersController {

    private final MemberService memberService;

    // 회원 가입 페이지 이동
    @GetMapping("/signup")
    public String getCreateMemberPage(MemberInDTO dto, Model model){
        model.addAttribute("dto", dto);
        model.addAttribute("action", "/users/signup");
        return "users/signup";
    }

    // DB에 회원 추가
    @PostMapping("/signup")
    public String userSignup(MemberInDTO dto){
        memberService.saveMember(dto.getMemUserid(), dto.getMemName(), dto.getMemPasswd(), dto.getMemName(), dto.getRole());
        return "users/result";
    }
}
