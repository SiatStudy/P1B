package com.example.P1B.controller;

import com.example.P1B.domain.User;
import com.example.P1B.dto.SignupDTO;
import com.example.P1B.service.EmailService;
import com.example.P1B.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.URI;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/login")
public class LoginController {

    private final UserService userService;
    private final EmailService emailService;

    // 아이디 찾기 뒷 2자리 * 처리
    private String encryptStar(String username) {
        if (username != null && username.length() > 2) {
            int length = username.length();
            return username.substring(0, length - 2) + "**";
        }
        return username;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SignupDTO signupDTO, HttpServletRequest request) {
        System.out.println("signupDTO: " + signupDTO);

        User user = userService.findUser(signupDTO.getUsername());
        System.out.println("user: " + user.getUsername());
        System.out.println("user: " + user.getUserPassword());

        if (user == null) {
            System.out.println("사용자를 찾을 수 없습니다.");
            return new ResponseEntity<>(Map.of("isValid", false, "message", "사용자를 찾을 수 없습니다."), HttpStatus.UNAUTHORIZED);
        }

        // 비밀번호가 null이거나 비어 있는 경우 확인
        String rawPassword = signupDTO.getUserpassword();
        if (rawPassword == null || rawPassword.isEmpty()) {
            System.out.println("비밀번호를 입력해주세요.");
            return new ResponseEntity<>(Map.of("isValid", false, "message", "비밀번호를 입력해주세요."), HttpStatus.UNAUTHORIZED);
        }

        // 비밀번호가 일치하는지 확인하기 위한 코드
        if (user.getUsername().equals(signupDTO.getUsername()) && user.getUserPassword().equals(rawPassword)) {
            System.out.println("로그인 성공");

            System.out.println("username : "+ user.getUsername());
            System.out.println("userEmail : "+ user.getUserEmail());

            HttpSession session = request.getSession();
            session.setMaxInactiveInterval(3600);

            request.getSession().setAttribute("username", user.getUsername());
            request.getSession().setAttribute("useremail", user.getUserEmail());
            request.getSession().setAttribute("usernickname", user.getUserNickName());

            System.out.println("========= 세션 값 확인 ========");
            System.out.println("session = " + session);

            System.out.println("username : "+ session.getAttribute("username"));
            System.out.println("userEmail : "+ session.getAttribute("useremail"));

            return ResponseEntity.ok()
                    .cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS))
                    .body(Map.of("isValid", true));
        } else {
            System.out.println("로그인 실패");
            return new ResponseEntity<>(Map.of("isValid", false, "message", "로그인 실패, 아이디와 비밀번호를 확인해주세요."), HttpStatus.UNAUTHORIZED);
        }
    }



    @PostMapping("/duple/id")
    @ResponseBody
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

    @PostMapping("/duple/email")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> emailCheck(@RequestBody SignupDTO signupDTO) {
        System.out.println("-------------- useremail : " + signupDTO.getUseremail());

        boolean isIdUnique = userService.emailCheck(signupDTO.getUseremail());

        if (isIdUnique) {
            System.out.println("sendMail 실행 확인");
            System.out.println("----------mailDTO email : " + signupDTO.getUseremail());
            System.out.println("----------mailDTO username : " + signupDTO.getUsername());

            Map<String, Object> response = new HashMap<>();
            try {
                response.put("isValid", true);
                System.out.println("---------- emailService 이메일 전송 시작 -------------");
                emailService.sendSimpleMessage(signupDTO);
                response.put("message", "메일이 성공적으로 전송되었습니다.");
            } catch (Exception e){
                response.put("isValid", false);
                response.put("message", "메일 전송이 실패했습니다. 다시 시도해 주세요");
                e.printStackTrace();
            }
            return ResponseEntity.ok(response);
        } else {
            System.out.println("------------- duple email else문 -----------");
            Map<String, Object> response = new HashMap<>();
            response.put("isValid", isIdUnique);
            response.put("message", "중복된 이메일 입니다");
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/search/id")
    @ResponseBody
    public ResponseEntity<Map> findId(@RequestBody SignupDTO signupDTO) {
        // 서비스 메소드 호출
        User optionalUsername = userService.findIdByEmail(signupDTO.getUseremail());
        if (optionalUsername != null) {
            String username = optionalUsername.getUsername();
            String maskname = encryptStar(username);
            String message = "찾으신 아이디는: " + maskname;
            System.out.println("id : " + username);
            System.out.println("find Id 값 : " + message);
            return new ResponseEntity<>(Map.of("username", maskname, "isValid", true), HttpStatus.OK);
        } else {
            // 검증 완료된 코드. 나중에 프로덕션 단계에서 코드 정리할 때 스트링 부분은 날려야 합니다. 참고하세요.
            String message = "해당 아이디를 찾을 수 없습니다.";
            System.out.println("find Id 값 : " + message);
            return new ResponseEntity<>(Map.of("isValid", false), HttpStatus.OK);
        }
    }

    @PostMapping("/search/password")
    @ResponseBody
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
