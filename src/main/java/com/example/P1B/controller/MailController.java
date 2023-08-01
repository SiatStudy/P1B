package com.example.P1B.controller;

import com.example.P1B.dto.MailDTO;
import com.example.P1B.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
    public ResponseEntity<String> sendMail(@RequestParam("address") String address,
                                           @RequestParam("title") String title,
                                           @RequestParam("content") String content) {
        MailDTO mailDto = new MailDTO();
        mailDto.setAddress(address);
        mailDto.setTitle(title);
        mailDto.setContent(content);

        emailService.sendSimpleMessage(mailDto);
        return new ResponseEntity<>("메일 전송이 완료되었습니다.", HttpStatus.OK);
    }

}
