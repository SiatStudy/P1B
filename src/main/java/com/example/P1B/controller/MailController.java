package com.example.P1B.controller;

import com.example.P1B.dto.MailDTO;
import com.example.P1B.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// 작성자 : 장재형

@Controller
@RequestMapping("/api/mail")
public class MailController {

    // 이메일 서비스 생성자 주입
    private final EmailService emailService;


    public MailController(EmailService emailService) {
        this.emailService = emailService;
    }

    // 이메일 전송 페이지 요청 처리
    @GetMapping("/send")
    public String main() {
        return "SendMail.html";
    }

    // 이메일 전송 요청 처리
    @PostMapping("/send")
    public @ResponseBody ResponseEntity<Map<String, Boolean>> sendMail(@Validated
                                           @RequestBody MailDTO mailDto) {
        System.out.println("sendMail 실행 확인");
        System.out.println("address : " + mailDto.getAddress());
        System.out.println("title : " + mailDto.getTitle());
        System.out.println("content : " + mailDto.getContent());

        Map<String, Boolean> map1 = new HashMap<>();
        try {

            // 이메일 전송 성공 시 결과 지정
            map1.put("result", true);
            
            // 이메일 서비스 사용 후 메시지 전송
            emailService.sendSimpleMessage(mailDto);
        }catch (Exception e){
            
            // 이메일 전송 실패 시 결과 지정
            map1.put("result", false);
            e.printStackTrace();
        }

//        테스트용 코드
//        map1.put("result", "true");
//        map1.put("address", mailDto.getAddress());
//        map1.put("title", mailDto.getTitle());
//        map1.put("content", mailDto.getContent());

        // 응답 객체를 생성하고 결과를 반환
        ResponseEntity<Map<String, Boolean>> entity =
                new ResponseEntity<>(map1, HttpStatus.OK);
        return entity;
//        return mailDto;
    }

}
