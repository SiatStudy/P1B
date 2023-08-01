package com.example.P1B.service;

import com.example.P1B.dto.MailDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private JavaMailSender mailSender;

    // 생성자 주입을 이용한 의존성 주입
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    public void sendSimpleMessage(MailDTO mailDto) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("siatproject123@gmail.com");
            message.setTo(mailDto.getAddress());
            message.setSubject("[TODOS] 회원 가입 이메일 인증");
            message.setText(mailDto.getContent());
            mailSender.send(message);
        } catch (Exception e) {
            logger.error("sendSimpleMessage 메서드에서 오류 발생", e);
        }
    }

}
