package com.example.P1B.controller;

import com.example.P1B.dto.UserDTO;
import com.example.P1B.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.ValidationException;

@Controller
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {

    private final UserService userService;

    // 회원가입 페이지 출력 요청
    @GetMapping("/signup")
    public String signUpForm() {
        return "signup";
    }


    @PostMapping("/signup")
    @Validated
    public String signUp(@Validated
                             @RequestBody
                             @ModelAttribute UserDTO userDTO, BindingResult bindingResult) {
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
        }else{
            userService.signUp(userDTO);
            return "login";
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

    @PostMapping("/update")
    public String update(@ModelAttribute UserDTO userDTO) {
        userService.update(userDTO);
        return "redirect:/users/" + userDTO.getId();
    }

    @GetMapping("/delete/{id}")
    public String deleteById(@PathVariable Long id) {
        userService.deleteById(id);
        return "redirect:/users/";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "index";
    }

    @PostMapping("/changePassword")
    public String changePassword(@RequestParam("username") String username, @RequestParam("newPassword") String newPassword) {
        userService.changePassword(username, newPassword);
        return "redirect:/"; // index.html로 리다이렉트
    }
}
