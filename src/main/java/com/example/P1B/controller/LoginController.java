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
    public ResponseEntity<Boolean> idCheck(@RequestBody SignupDTO signupDTO) {
        String username = signupDTO.getUsername();

        System.out.println("-------------- username : " + username);

        boolean isIdUnique = userService.idCheck(username);

        return new ResponseEntity<>(isIdUnique, HttpStatus.OK);
    }

    @PostMapping("/duple/email")
    public ResponseEntity<Boolean> emailCheck(@RequestBody SignupDTO signupDTO) {
        System.out.println("-------------- useremail : " + signupDTO.getUseremail());

        boolean isIdUnique = userService.emailCheck(signupDTO.getUseremail());

        return new ResponseEntity<>(isIdUnique, HttpStatus.OK);
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
    public Boolean findPassword(@RequestBody SignupDTO signupDTO) {
//        try {
//            //서비스 메소드 호출 후, 새 비밀번호 변경 페이지로 이동
//            String result = userService.findUserByUsernameAndEmail(username, userEmail);
//            return true;
//        } catch (UserNotFoundException e) {
//            // 이메일이나 아이디가 존재하지 않을 경우 에러 메시지를 반환
//            return false;
//        }
        System.out.println("-------------- name : " + signupDTO.getUsername());
        System.out.println("-------------- email : " + signupDTO.getUseremail());
        return userService.findUserByUsernameAndEmail(signupDTO.getUsername(), signupDTO.getUseremail());
    }
}
