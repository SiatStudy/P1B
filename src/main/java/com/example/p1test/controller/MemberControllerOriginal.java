//package com.example.p1test.controller;
//
//import com.example.p1test.dto.MemberDTO;
//import com.example.p1test.service.MemberService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.HttpSession;
//import java.util.List;
//
//@Controller
//@RequiredArgsConstructor
//public class MemberControllerOriginal {
//    // 생성자 주입
//    private final MemberService memberService;
//
//    // 회원가입 페이지 출력 요청
//    @GetMapping("/member/join")
//    public String joinForm() {
//        return "join";
//    }
//
//    @PostMapping("/member/join")
//    public String join(@ModelAttribute MemberDTO memberDTO) {
//        System.out.println("MemberController.join");
//        System.out.println("memberDTO = " + memberDTO);
//        memberService.join(memberDTO);
//        return "login";
//    }
//
//    @GetMapping("/member/login")
//    public String loginForm() {
//        return "login";
//    }
//
//    @PostMapping("/member/login")
//    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
//        MemberDTO loginResult = memberService.login(memberDTO);
//        if (loginResult != null) {
//            // login 성공
//            session.setAttribute("loginEmail", loginResult.getMemberId());
//            return "main";
//        } else {
//            // login 실패
//            return "login";
//        }
//    }
//
//    @GetMapping("/member/")
//    public String findAll(Model model) {
//        List<MemberDTO> memberDTOList = memberService.findAll();
//        // 어떠한 html로 가져갈 데이터가 있다면 model사용
//        model.addAttribute("memberList", memberDTOList);
//        return "list";
//    }
//
//    @GetMapping("/member/{id}")
//    public String findById(@PathVariable Long id, Model model) {
//        MemberDTO memberDTO = memberService.findById(id);
//        model.addAttribute("member", memberDTO);
//        return "detail";
//    }
//
//    @GetMapping("/member/update")
//    public String updateForm(HttpSession session, Model model) {
//        String myEmail = (String) session.getAttribute("loginEmail");
//        MemberDTO memberDTO = memberService.updateForm(myEmail);
//        model.addAttribute("updateMember", memberDTO);
//        return "update";
//    }
//
//    @PostMapping("/member/update")
//    public String update(@ModelAttribute MemberDTO memberDTO) {
//        memberService.update(memberDTO);
//        return "redirect:/member/" + memberDTO.getId();
//    }
//
//    @GetMapping("/member/delete/{id}")
//    public String deleteById(@PathVariable Long id) {
//        memberService.deleteById(id);
//        return "redirect:/member/";
//    }
//
//    @GetMapping("/member/logout")
//    public String logout(HttpSession session) {
//        session.invalidate();
//        return "index";
//    }
//
//    @PostMapping("/member/email-check")
//    public @ResponseBody String emailCheck(@RequestParam("memberId") String memberId) {
//        System.out.println("memberId = " + memberId);
//        String checkResult = memberService.emailCheck(memberId);
//        return checkResult;
////        if (checkResult != null) {
////            return "ok";
////        } else {
////            return "no";
////        }
//    }
//
//}
//
//
//
//
//
//
//
//
//
