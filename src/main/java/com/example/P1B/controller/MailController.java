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
@RequestMapping("/api/mail")
public class MailController {

    private final EmailService emailService;

    public MailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/send")
    public String main() {
        return "SendMail.html";
    }

    @PostMapping("/send")
    public @ResponseBody ResponseEntity<Map<String, Boolean>> sendMail(@Validated
                                           @RequestBody MailDTO mailDto) {
        System.out.println("sendMail 실행 확인");
        System.out.println("address : " + mailDto.getAddress());
        System.out.println("title : " + mailDto.getTitle());
        System.out.println("content : " + mailDto.getContent());

        Map<String, Boolean> map1 = new HashMap<>();
        try {
            map1.put("result", true);
            emailService.sendSimpleMessage(mailDto);
        }catch (Exception e){
            map1.put("result", false);
            e.printStackTrace();
        }

//        테스트용 코드
//        map1.put("result", "true");
//        map1.put("address", mailDto.getAddress());
//        map1.put("title", mailDto.getTitle());
//        map1.put("content", mailDto.getContent());
        // return Json to browser
        ResponseEntity<Map<String, Boolean>> entity =
                new ResponseEntity<>(map1, HttpStatus.OK);
        return entity;
//        return mailDto;
    }

}
