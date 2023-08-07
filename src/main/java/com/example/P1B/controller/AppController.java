package com.example.P1B.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {
    @GetMapping("/P1F")
    public String P1F(){
        return "P1F/index";
    }
}