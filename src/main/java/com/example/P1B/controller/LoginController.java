package com.example.P1B.controller;

import com.example.P1B.exception.UserNotFoundException;
import com.example.P1B.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final UserService userService;

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }
    @PostMapping("/duple/id")
    public @ResponseBody boolean idCheck(@RequestBody String username) {
        return !userService.idCheck(username);
    }

    @PostMapping("/duple/email")
    public @ResponseBody boolean emailCheck(@RequestBody String userEmail) {
        return !userService.emailCheck(userEmail);
    }

    @GetMapping("/search/id")
    public String findIdForm() {
        return "findId";
    }


    @PostMapping("/search/id")
    @ResponseBody
    public ResponseEntity<Map> findId(@RequestParam("userEmail") String userEmail, Model model) {
        // 서비스 메소드 호출
        Optional<String> optionalUsername = userService.findIdByEmail(userEmail);
        if (optionalUsername.isPresent()) {
            String username = optionalUsername.get();
            String message = "찾으신 아이디는: " + username;
            System.out.println("id : " + username);
            System.out.println("find Id 값 : " + message);
            return new ResponseEntity<>(Map.of("userid", username), HttpStatus.OK);
        } else {
            String message = "해당 아이디를 찾을 수 없습니다.";
            System.out.println("find Id 값 : " + message);
            model.addAttribute("resultMessage", message);
            return new ResponseEntity<>(Map.of("userid", message), HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/search/password")
    public String findPasswordForm() {
        return "findPassword";
    }

    @PostMapping("/search/password")
    public String findPassword(@RequestParam("username") String username, @RequestParam("userEmail") String userEmail, Model model) {
        try {
            //서비스 메소드 호출 후, 새 비밀번호 변경 페이지로 이동
            String result = userService.findUserByUsernameAndEmail(username, userEmail);
            model.addAttribute("username", result);
            return "changePassword";
        } catch (UserNotFoundException e) {
            // 이메일이나 아이디가 존재하지 않을 경우 에러 메시지를 반환
            model.addAttribute("errorMessage", e.getMessage());
            return "findPassword";
        }
    }
}
