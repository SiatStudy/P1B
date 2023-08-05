package com.example.P1B.exception;


// 작성자 : 장재형

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
