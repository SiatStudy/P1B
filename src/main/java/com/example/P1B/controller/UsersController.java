package com.example.P1B.controller;

import com.example.P1B.domain.User;
import com.example.P1B.dto.SignupDTO;
import com.example.P1B.dto.UserDTO;
import com.example.P1B.exception.UserNotFoundException;
import com.example.P1B.repository.UserRepository;
import com.example.P1B.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.validation.ValidationException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@Controller
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;
    private final UserRepository userRepository;

//    public String encryptPassword(String password) {
//        try {
//            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
//            messageDigest.update(password.getBytes());
//            byte[] bytes = messageDigest.digest();
//
//            StringBuilder stringBuilder = new StringBuilder();
//
//            for (byte b : bytes) {
//                stringBuilder.append(String.format("%02x", b));
//            }
//            return stringBuilder.toString();
//        } catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException("암호화 실패");
//        }
//    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Boolean>> signUp(@Valid
                                                       @RequestBody SignupDTO signupDTO,
                                                       BindingResult bindingResult) {
        System.out.println("UserController.signUp");

        System.out.println("UserController.signUp");
        System.out.println("userDTO = " + signupDTO);


        if (bindingResult.hasErrors()) {
            // 유효성 위반 결과를 모두 출력
            for (ObjectError objErr : bindingResult.getAllErrors()) {
                System.out.println("메세지 : " + objErr.getDefaultMessage());
                System.out.println("code : " + objErr.getCode());
                System.out.println("object name : " + objErr.getObjectName());
                // 유효성 위반 코드
                System.out.println("<<<<<< code >>>>>>");
                String[] codes = objErr.getCodes();
                for (String c1 : codes) {
                    System.out.println(c1);
                }
                // 유효성 위반에 대한 대응 메시지 처리
                if (codes[0].equals("Size.UserDTO.id")) {
                    System.out.println("text3는 1 ~ 5 글자 사이를 담을 수 있습니다");
                } else if (codes[0].equals("Size.UserDTO.userPassword")) {
                    System.out.println("text3는 3 ~ 10 글자 사이를 담을 수 있습니다");
                } else if (codes[0].equals("Size.UserDTO.userNickName")) {
                    System.out.println("text3는 3 ~ 10 글자 사이를 담을 수 있습니다");
                } else if (codes[0].equals("Size.UserDTO.userEmail")) {
                    System.out.println("이메일 형식에 맞춰주세요. 이메일은 @ 앞에 최대 63자까지 올 수 있습니다.");
                }
            }
        }
        if (bindingResult.hasErrors()) {
            throw new ValidationException();
        } else {
            String oldPassword = signupDTO.getUserpassword();
//            String encryptedPassword = encryptPassword(oldPassword); // 암호화 추가
            signupDTO.setUserpassword(oldPassword);

            userService.signUp(signupDTO);
            return new ResponseEntity<>(Map.of("isValid", true), HttpStatus.OK);
        }
    }

    @GetMapping("/main")
    public String mainPage(HttpSession session, Model model) {
        String sessionId = session.getId();
        model.addAttribute("sessionId", sessionId);
        return "main";
    }


    @GetMapping("/{id}")
    public String findById(@PathVariable Long id, Model model) {
        UserDTO userDTO = userService.findById(id);
        model.addAttribute("user", userDTO);
        return "detail";
    }


    @GetMapping("/update")
    public String updateForm(Model model, HttpSession session) {
        // 세션에서 사용자 이메일 조회
        String myEmail = (String) session.getAttribute("userEmail");
        if (myEmail == null) {
            // 로그인되지 않은 경우 에러 페이지 표시
            return "error";
        }
        UserDTO userDTO = userService.updateForm(myEmail);
        model.addAttribute("updateUser", userDTO);
        return "update";
    }

    @PatchMapping("/info")
    public String update(@ModelAttribute UserDTO userDTO) {
        userService.update(userDTO);
        return "redirect:/users/" + userDTO.getId();
    }


    @DeleteMapping("/info/{username}")
    public String deleteById(HttpSession session) {
        String userEmail = (String) session.getAttribute("userEmail");
        User user = userService.findByUser(userEmail);
        user.setMemResigned("Y");
        userRepository.save(user);
        return "redirect:/users/";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "index";
    }

    @PostMapping("/changepassword")
    public ResponseEntity<Map<String, Boolean>> changePassword(@RequestBody SignupDTO signupDTO) {
        System.out.println("********************************");
        System.out.println("useremail : " + signupDTO.getUseremail());
        System.out.println("newuserpassword : " + signupDTO.getUserpassword());
        System.out.println("********************************");

        String newPassword = signupDTO.getUserpassword();
//        String encryptedPassword = encryptPassword(newPassword); // 암호화 추가

        try {
            userService.changePassword(signupDTO.getUseremail(), newPassword);
            String message = "비밀번호가 변경되었습니다.";
            System.out.println(message);
            return new ResponseEntity<>(Map.of("isValid", true), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            String message = "이런! 문제가 생겼네요";
            System.out.println(message);
            return new ResponseEntity<>(Map.of("isValid", false), HttpStatus.OK);
        }
    }

    @GetMapping("/setting")
    public ResponseEntity<?> session(HttpSession session) {
        String useremail = (String) session.getAttribute("useremail");
        String username = (String) session.getAttribute("username");
        String usernickname = (String) session.getAttribute("usernickname");

        System.out.println("--------------- username : " + username);
        System.out.println("--------------- useremail : " + useremail);
        System.out.println("--------------- usernickname : " + usernickname);

        return new ResponseEntity<>(Map.of("isValid", true, "useremail", useremail, "usernickname", usernickname), HttpStatus.OK);
    }
}
