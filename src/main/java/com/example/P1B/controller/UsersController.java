package com.example.P1B.controller;

import com.example.P1B.dto.UserDTO;
import com.example.P1B.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

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
    public String signUp(@ModelAttribute UserDTO userDTO) {
        System.out.println("UserController.signUp");
        System.out.println("userDTO = " + userDTO);
        userService.signUp(userDTO);
        return "login";
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
