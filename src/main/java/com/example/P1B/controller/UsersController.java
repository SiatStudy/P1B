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

// 작성자 : 장재형

@Controller
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {

    private final UserService userService;

    // 회원가입 페이지 출력 요청 페이지
    @GetMapping("/signup")
    public String joinForm() {
        return "signup"; // signup.html 파일을 반환
    }

    // 회원가입 요청 페이지
    @PostMapping("/signup")
    public String join(@ModelAttribute UserDTO userDTO) {
        System.out.println("UserController.join");
        System.out.println("userDTO = " + userDTO);

        userService.join(userDTO); // UserService를 이용해 회원가입 처리
        return "login"; // login.html 파일을 반환
    }

    // 메인 페이지 요청 페이지
    @GetMapping("/main")
    public String mainPage(HttpSession session, Model model) {
        String sessionId = session.getId();
        model.addAttribute("sessionId", sessionId);
        return "main"; // main.html 파일을 반환
    }

    // 특정 유저 조회 요청 페이지
    @GetMapping("/{id}")
    public String findById(@PathVariable Long id, Model model) {
        UserDTO userDTO = userService.findById(id); // id로 유저 조회
        model.addAttribute("user", userDTO);
        return "detail"; // detail.html 파일을 반환
    }

    // 회원 정보 업데이트 폼 요청 페이지
    @GetMapping("/update")
    public String updateForm(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String myEmail = authentication.getName();
        UserDTO userDTO = userService.updateForm(myEmail);
        model.addAttribute("updateUser", userDTO);
        return "update"; // update.html 파일을 반환
    }

    // 회원 정보 업데이트 요청 페이지
    @PostMapping("/update")
    public String update(@ModelAttribute UserDTO userDTO) {
        userService.update(userDTO); // 유저 정보 업데이트 처리
        return "redirect:/users/" + userDTO.getId(); // 해당 유저의 detail 페이지로 리다이렉트
    }

    // 특정 유저 삭제 요청 페이지
    @GetMapping("/delete/{id}")
    public String deleteById(@PathVariable Long id) {
        userService.deleteById(id); // 해당 id의 유저 삭제 처리
        return "redirect:/users/"; // 모든 유저의 리스트 페이지로 리다이렉트
    }

    // 로그아웃 요청 페이지
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // 세션 무효화 처리
        return "index"; // index.html 파일을 반환
    }

    // 비밀번호 변경 요청 페이지
    @PostMapping("/changePassword")
    public String changePassword(@RequestParam("username") String username, @RequestParam("newPassword") String newPassword) {
        userService.changePassword(username, newPassword); // 비밀번호 변경 처리
        return "redirect:/"; // index.html로 리다이렉트
    }
}
