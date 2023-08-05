package com.example.P1B.domain;


// 작성자 : 장재형

public enum Role {
    USER("USER"),
    ANONYMOUS("ANONYMOUS");

    // 문자열 값을 저장하기 위한 변수
    private final String value;

    // 생성자
    Role(String value) {
        this.value = value;
    }

    // 상수가 가지고 있는 문자열 값을 반환하는 메서드
    public String getValue() {
        return value;
    }
}
