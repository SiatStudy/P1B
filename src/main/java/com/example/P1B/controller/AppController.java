package com.example.P1B.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.CacheControl;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class AppController {
    @RequestMapping(value = "/loginpage", produces = "text/html")
    public String loginpage(HttpServletRequest request, HttpServletResponse response) {
        String etag = "1234"; // 임의의 Etag 값
        response.addHeader("ETag", etag); // ETag 헤더 설정
        String ifNoneMatch = request.getHeader("If-None-Match"); // If-None-Match 헤더 값 가져오기
        if (etag.equals(ifNoneMatch)) { // ETag 값이 일치하면
            return "redirect:/loginpage"; // 302 리다이렉트 보내기
        }else{
            return "loginpage/index";
        }
    }


    @RequestMapping(value = "/mainpage", produces = "text/html")
    public String mainpage(HttpServletRequest request, HttpServletResponse response) {
        String etag = "1234"; // 임의의 Etag 값
        response.addHeader("ETag", etag); // ETag 헤더 설정
        String ifNoneMatch = request.getHeader("If-None-Match"); // If-None-Match 헤더 값 가져오기
        if (etag.equals(ifNoneMatch)) { // ETag 값이 일치하면
            return "redirect:/mainpage"; // 302 리다이렉트 보내기
        }else{
        return "mainpage/index";
        }
    }
}