package com.example.P1B.dto;

import com.example.P1B.domain.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private Long id;
    private String username;
    private String userPassword;
    private String userNickName;
    private String userEmail;
    private User user;
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
