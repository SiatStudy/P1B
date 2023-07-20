package com.example.P1B.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
@RequiredArgsConstructor
public class MemberLoginController {
//    @RequestMapping("/Signup")
//    public String Signup(Model model) {
//        model.addAttribute("data1", "hello spring!");
//        model.addAttribute("data2", "hello <b>spring!</b>");
//        return "/Member/Signup";
//    }
    @PostMapping("/duple")
    public String loginDuple(){
        return "";
    }
    @PostMapping("/email")
    public String loginemail(){
        // login 로직으로
        return "";
    }
    @PostMapping("/search/id")
    public String loginSearchId(){
        return "";
    }
    @PostMapping("/search/password")
    public String loginSearchPassword(){
        return "";
    }
}
