package com.example.P1B.dto;

import com.example.P1B.domain.User;
import lombok.*;

// 작성자 : 장재형

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    // 고유 ID 값
    private Long id;
    
    // 사용자 아이디
    private String username;
    
    // 사용자 비밀번호
    private String userPassword;
    
    // 사용자 닉네임
    private String userNickName;
    
    // 사용자 이메일
    private String userEmail;
    
    // 유저 객체 선언
    private User user;
    
    // 유저 타입 지정
    private User.Role role;

    public static UserDTO toUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setUserPassword(user.getUserPassword());
        userDTO.setUserNickName(user.getUserNickName());
        userDTO.setUserEmail(user.getUserEmail());
        userDTO.setUser(user);
        return userDTO;
    }
}
