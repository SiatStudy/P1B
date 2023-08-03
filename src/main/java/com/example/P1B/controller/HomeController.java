package com.example.P1B.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;

@Controller
public class HomeController {

    @GetMapping
    public String index() {
        return "index";
    }

    @GetMapping("/test1")
    public String test1(Model model) {

        int[] array1 = {10, 20, 30};
        // model.addAttribute("array1", array1[0]);
        // Error : ArrayIndexOutOfBoundsException 수행
        // model.addAttribute("array1", array1[10]);

        // Error : NullPointException 수행
        ArrayList<String> list = null;
        list.add("문자열");

        // Error : ArithmeticException 수행
        // System.out.println(0 / 0);

        return "test1";
    }
}
