package com.example.P1B.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {
    @GetMapping("/loginpage")
    public String loginpage(){
        return "loginpage/index";
    }

    @GetMapping("/mainpage")
    public String mainpage(){
        return "mainpage/index";
    }
}