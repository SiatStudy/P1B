package com.example.P1B.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


//public class MemberController {

@Controller
@RequestMapping("/Mypage")
@RequiredArgsConstructor
public class MypageController {

    @RequestMapping("/ModifyMyinfo")
    public String ModifyMyinfo(Model model) {
        model.addAttribute("data1", "hello spring!");
        model.addAttribute("data2", "hello <b>spring!</b>");
        return "/Mypage/ModifyMyinfo";
    }

    @RequestMapping("/MypageInfo")
    public String MypageInfo(Model model) {
        model.addAttribute("data1", "hello spring!");
        model.addAttribute("data2", "hello <b>spring!</b>");
        return "/Mypage/MypageInfo";
    }
}
