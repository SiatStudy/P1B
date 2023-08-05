package com.example.P1B.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;

// 작성자 : 장재형

@Controller
public class HomeController {

    @GetMapping
    public String index() {
        return "index"; // index.HTML 반환
    }

    // 테스트 코드
    @GetMapping("/test1") // HTTP GET 요청을 /test1 경로에서 처리하는 메소드
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

        return "test1"; // test1 View 반환
    }
}
