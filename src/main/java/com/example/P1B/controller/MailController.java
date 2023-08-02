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

@Controller
public class MailController {

    private final EmailService emailService;

    public MailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/mail/send")
    public String main() {
        return "SendMail.html";
    }

    //    @PostMapping("/mail/send")
//    public String sendMail(MailDTO mailDto) {
//        emailService.sendSimpleMessage(mailDto);
//        System.out.println("메일 전송 완료");
//        return "resultMail.html";
//    }
    @PostMapping("/mail/send")
    public @ResponseBody ResponseEntity<Map<String, String>> sendMail(@Validated
                                           @RequestBody MailDTO mailDto) {
        System.out.println("sendMail 실행 확인");
        System.out.println("address : " + mailDto.getAddress());
        System.out.println("title : " + mailDto.getTitle());
        System.out.println("content : " + mailDto.getContent());
        try {
            emailService.sendSimpleMessage(mailDto);
        }catch (Exception e){
            e.printStackTrace();
        }

        Map<String, String> map1 = new HashMap<>();

        map1.put("result", "success");
        // return Json to browser
        ResponseEntity<Map<String, String>> entity =
                new ResponseEntity<>(map1, HttpStatus.OK);
        return entity;
//        return mailDto;
    }

}
