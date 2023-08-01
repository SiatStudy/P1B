package com.example.P1B.controller;

import com.example.P1B.dto.MemberDTO;
import com.example.P1B.exception.MemberNotFoundException;
import com.example.P1B.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원가입 페이지 출력 요청
    @GetMapping("/users/signup")
    public String joinForm() {
        return "signup";
    }

    @PostMapping("/users/signup")
    public String join(@ModelAttribute MemberDTO memberDTO) {
        System.out.println("MemberController.join");
        System.out.println("memberDTO = " + memberDTO);
        memberService.join(memberDTO);
        return "login";
    }

    @GetMapping("/login/login")
    public String loginForm() {
        return "login";
    }

    @GetMapping("/member/main")
    public String mainPage(HttpSession session, Model model) {
        String sessionId = session.getId();
        model.addAttribute("sessionId", sessionId);
        return "main";
    }


    @GetMapping("/member/{id}")
    public String findById(@PathVariable Long id, Model model) {
        MemberDTO memberDTO = memberService.findById(id);
        model.addAttribute("member", memberDTO);
        return "detail";
    }

    @GetMapping("/member/update")
    public String updateForm(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String myEmail = authentication.getName();
        MemberDTO memberDTO = memberService.updateForm(myEmail);
        model.addAttribute("updateMember", memberDTO);
        return "update";
    }

//    @PostMapping("/member/update")
//    public String update(MemberDTO memberDTO) {
//        memberService.update(memberDTO);
//        return "redirect:/member/main";
//    }

    @PostMapping("/member/update")
    public String update(@ModelAttribute MemberDTO memberDTO) {
        memberService.update(memberDTO);
        return "redirect:/member/" + memberDTO.getId();
    }

    @GetMapping("/member/delete/{id}")
    public String deleteById(@PathVariable Long id) {
        memberService.deleteById(id);
        return "redirect:/member/";
    }

    @GetMapping("/member/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "index";
    }

    @PostMapping("/member/id-check")
    public @ResponseBody String idCheck(@RequestParam("username") String username) {
        System.out.println("username = " + username);
        String checkResult = memberService.idCheck(username);
        return checkResult;
    }

    @PostMapping("/member/email-check")
    public @ResponseBody String emailCheck(@RequestParam("memberEmail") String memberEmail) {
        System.out.println("memberEmail = " + memberEmail);
        String checkResult = memberService.emailCheck(memberEmail);
        return checkResult;
    }

    @GetMapping("/login/search/id")
    public String findIdForm() {
        return "findId";
    }


    @PostMapping("/login/search/id")
    public String findId(@RequestParam("memberEmail") String memberEmail, Model model) {
        // 서비스 메소드 호출
        Optional<String> optionalUsername = memberService.findIdByEmail(memberEmail);

        if (optionalUsername.isPresent()) {
            String username = optionalUsername.get();
            String message = "찾으신 아이디는: " + username;
            System.out.println("id : " + username);
            System.out.println("find Id 값 : " + message);
            model.addAttribute("resultMessage", message);
        } else {
            String message = "해당 아이디를 찾을 수 없습니다.";
            System.out.println("find Id 값 : " + message);
            model.addAttribute("resultMessage", message);
        }
        System.out.println("id : " + optionalUsername);

        return "findIdResult";
    }

    @GetMapping("/login/search/password")
    public String findPasswordForm() {
        return "findPassword";
    }

    @PostMapping("/login/search/password")
    public String findPassword(@RequestParam("username") String username, @RequestParam("memberEmail") String memberEmail, Model model) {
        try {
            //서비스 메소드 호출 후, 새 비밀번호 변경 페이지로 이동
            String result = memberService.findMemberByUsernameAndEmail(username, memberEmail);
            model.addAttribute("username", result);
            return "changePassword";
        } catch (MemberNotFoundException e) {
            // 이메일이나 아이디가 존재하지 않을 경우 에러 메시지를 반환
            model.addAttribute("errorMessage", e.getMessage());
            return "findPassword";
        }
    }

    @PostMapping("/member/changePassword")
    public String changePassword(@RequestParam("username") String username, @RequestParam("newPassword") String newPassword) {
        memberService.changePassword(username, newPassword);
        return "redirect:/"; // index.html로 리다이렉트
    }
}
