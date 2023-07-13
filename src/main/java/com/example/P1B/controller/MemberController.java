package com.example.P1B.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Member")
@RequiredArgsConstructor
public class MemberController {

    @RequestMapping("/Signup")
    public String Signup(Model model) {
        model.addAttribute("data1", "hello spring!");
        model.addAttribute("data2", "hello <b>spring!</b>");
        return "/Member/Signup";
    }
}
