package com.example.P1B.controller;

import com.example.P1B.dto.SignupDTO;
import com.example.P1B.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/login")
@ResponseBody
public class LoginController {

    private final UserService userService;

    @PostMapping("/duple/id")
    public ResponseEntity<Map<String, Boolean>> idCheck(@RequestBody SignupDTO signupDTO) {
        String username = signupDTO.getUsername();

        System.out.println("-------------- username : " + username);

        boolean isIdUnique = userService.idCheck(username);
        System.out.println("-------------- isIdUnique : " + isIdUnique);
        if (isIdUnique == true){
            return new ResponseEntity<>(Map.of("isValid", true), HttpStatus.OK);
        } else {
        return new ResponseEntity<>(Map.of("isValid", false), HttpStatus.OK);
        }
    }
    
    public ResponseEntity<Map<String, Object>> emailCheck(@RequestBody SignupDTO signupDTO) {
        System.out.println("-------------- useremail : " + signupDTO.getUseremail());

        boolean isIdUnique = userService.emailCheck(signupDTO.getUseremail());

        Map<String, Object> responseMap = new HashMap<>();
        if (isIdUnique) {
            System.out.println("sendMail 실행 확인");
            System.out.println("----------mailDTO email : " + signupDTO.getUseremail());
            System.out.println("----------mailDTO username : " + signupDTO.getUsername());

            try {
                responseMap.put("isValid", true);
                System.out.println("---------- emailService 이메일 전송 시작 -------------");
                emailService.sendSimpleMessage(signupDTO);
                responseMap.put("message", "메일이 성공적으로 전송되었습니다.");
            } catch (Exception e) {
                responseMap.put("isValid", false);
                responseMap.put("message", "메일 전송이 실패했습니다. 다시 시도해 주세요");
                e.printStackTrace();
            }
        } else {
            System.out.println("------------- duple email else문 -----------");
            responseMap.put("isValid", false);
            responseMap.put("message", "중복된 이메일 입니다");
        }

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    @PostMapping("/search/id")
    public ResponseEntity<Map> findId(@RequestBody SignupDTO signupDTO) {
        // 서비스 메소드 호출
        Optional<String> optionalUsername = userService.findIdByEmail(signupDTO.getUseremail());
        if (optionalUsername.isPresent()) {
            String username = optionalUsername.get();
            String message = "찾으신 아이디는: " + username;
            System.out.println("id : " + username);
            System.out.println("find Id 값 : " + message);
            return new ResponseEntity<>(Map.of("username", username, "isValid", true), HttpStatus.OK);
        } else {
            // 검증 완료된 코드. 나중에 프로덕션 단계에서 코드 정리할 때 스트링 부분은 날려야 합니다. 참고하세요.
            String message = "해당 아이디를 찾을 수 없습니다.";
            System.out.println("find Id 값 : " + message);
            return new ResponseEntity<>(Map.of("isValid", false), HttpStatus.OK);
        }
    }

    @PostMapping("/search/password")
    public ResponseEntity<Map> findPassword(@RequestBody SignupDTO signupDTO) {

        // 서비스 메소드 호출
        Optional<String> optionalUserpassword = userService.findUserByUsernameAndEmail(signupDTO.getUsername(), signupDTO.getUseremail());
        if (optionalUserpassword.isPresent()) {
            String username = optionalUserpassword.get();
            String useremail = signupDTO.getUseremail();
            String message = "찾으신 아이디는: " + username;
            String message2 = "찾으신 이메일은: " + useremail;
            System.out.println("id : " + username);
            System.out.println("find Id 값 : " + message);
            System.out.println("email : " + useremail);
            System.out.println("find Id 값 : " + message2);
            return new ResponseEntity<>(Map.of("username", username, "isValid", true, "useremail", useremail), HttpStatus.OK);
        } else {
            // 검증 완료된 코드. 나중에 프로덕션 단계에서 코드 정리할 때 스트링 부분은 날려야 합니다. 참고하세요.
            String message = "해당 아이디와 이메일을 찾을 수 없습니다.";
            System.out.println("find Id 값 : " + message);
            return new ResponseEntity<>(Map.of("isValid", false), HttpStatus.OK);
        }

    }
}
