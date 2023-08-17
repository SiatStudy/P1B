package com.example.P1B.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class AppController {
    @RequestMapping("/loginpage")
    public String loginpage() {
        return "loginpage/index";
    }

    @RequestMapping("/mainpage")
    public String mainpage() {
        return "mainpage/index";
    }
}