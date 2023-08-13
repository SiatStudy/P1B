package com.example.P1B.controller;

import com.example.P1B.domain.User;
import com.example.P1B.dto.SignupDTO;
import com.example.P1B.dto.UserDTO;
import com.example.P1B.exception.UserNotFoundException;
import com.example.P1B.repository.UserRepository;
import com.example.P1B.service.CustomizeUserDetails;
import com.example.P1B.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.validation.ValidationException;
import java.util.Map;

@Controller
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;
    private final UserRepository userRepository;

    // 회원가입 페이지 출력 요청
    @GetMapping("/signup")
    public String signUpForm() {
        return "signup";
    }


    @PostMapping("/signup")
    public String signUp(@Valid @RequestBody Map<String, Object> requestData, UserDTO userDTO, BindingResult bindingResult) {
        System.out.println("UserController.signUp");

        System.out.println("UserController.signUp");
        System.out.println("userDTO = " + userDTO);


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
            userService.signUp(userDTO);
            return "redirect:/login";
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
    public String updateForm(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String myEmail = authentication.getName();
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
    public String deleteById(@AuthenticationPrincipal CustomizeUserDetails customizeUserDetails) {
        User user = userService.findByUser(customizeUserDetails.getUserEmail());
        user.setMemResigned("Y");
        userRepository.save(user);
        return "redirect:/users/";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "index";
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Map<String, Boolean>> changePassword(@RequestBody SignupDTO signupDTO) {
        System.out.println("********************************");
        System.out.println("useremail : " + signupDTO.getUseremail());
        System.out.println("newuserpassword : " + signupDTO.getUserpassword());
        System.out.println("********************************");
    try {
        userService.changePassword(signupDTO.getUseremail(), signupDTO.getUserpassword());
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
    public String session(@AuthenticationPrincipal CustomizeUserDetails customizeUserDetails, Model model){
        System.out.println("--------------- username : " + customizeUserDetails.getUsername());
        System.out.println("--------------- userEmail : " + customizeUserDetails.getUserEmail());
        model.addAttribute("username", customizeUserDetails.getUsername());
        model.addAttribute("userEmail", customizeUserDetails.getUserEmail());
        return "usersetting";
    }
}
