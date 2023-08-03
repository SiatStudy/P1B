package com.example.P1B.error;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(Exception.class)
    public String exception1(Exception e) {
        e.printStackTrace();
        return "/error/404";
    }
}
