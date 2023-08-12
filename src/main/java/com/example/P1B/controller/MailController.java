package com.example.P1B.controller;

import com.example.P1B.domain.Email;
import com.example.P1B.dto.MailDTO;
import com.example.P1B.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {

    private final EmailService emailService;

    @PostMapping("/send")
    public @ResponseBody ResponseEntity<Map<String, Boolean>> sendMail(@Validated
                                                                       @RequestBody MailDTO mailDto) {
        System.out.println("sendMail 실행 확인");
        System.out.println("----------mailDTO email : " + mailDto.getUseremail());
        System.out.println("----------mailDTO username : " + mailDto.getUsername());

        Map<String, Boolean> map1 = new HashMap<>();
        try {
            map1.put("result", true);
            emailService.sendSimpleMessage(mailDto);
        } catch (Exception e){
            map1.put("result", false);
            e.printStackTrace();
        }

        ResponseEntity<Map<String, Boolean>> entity =
                new ResponseEntity<>(map1, HttpStatus.OK);
        return entity;
    }

    @PostMapping("/check")
    public @ResponseBody ResponseEntity<Map<String, Boolean>> codeCheck(@RequestBody MailDTO mailDto){
        Email email = emailService.findUser(mailDto.getUsername());

        Map<String, Boolean> map1 = new HashMap<>();
        if (email.getVrAuthCode() == mailDto.getCode()) {
            map1.put("result", true);
        } else {
            map1.put("result", false);
        }

        return new ResponseEntity<>(map1, HttpStatus.OK);
    }

}
