package com.example.P1B.controller;

import com.example.P1B.domain.Email;
import com.example.P1B.dto.SignupDTO;
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

    @PostMapping("/check")
    public @ResponseBody ResponseEntity<Map<String, Boolean>> codeCheck(@RequestBody SignupDTO signupDTO){
        Email email = emailService.findUser(signupDTO.getUsername());

        Map<String, Boolean> map1 = new HashMap<>();
        if (email.getVrAuthCode() == signupDTO.getCode()) {
            map1.put("isValid", true);
        } else {
            map1.put("isValid", false);
        }

        return new ResponseEntity<>(map1, HttpStatus.OK);
    }

}
