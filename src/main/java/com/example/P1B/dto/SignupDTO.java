package com.example.P1B.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupDTO {
    @NotBlank(message = "공백이 있으면 안됩니다.")
    @Size(min = 3, max= 8, message = "최소 3글자 이상, 최대 8글자 이하여야 합니다.")
    @Pattern(regexp = "^(.*[A-Za-z])(?=.*\\d)[a-z\\d]{3,8}$", message = "영문과 숫자로 이루어진 8자리 이하의 조합이여야 합니다.")
    private String username;
    @NotBlank(message = "공백이 있으면 안됩니다.")
    @Size(min = 8, max=15, message = "최소 8글자 이상, 최대 15글자 이하여야 합니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\\\\|,.<>/?])[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};':\\\\|,.<>/?]{8,15}$")
    private String userpassword;
    @NotBlank(message = "공백이 있으면 안됩니다.")
    @Size(min = 3, max=15, message = "최소 3글자 이상, 최대 15글자 이하여야 합니다.")
    @Pattern(regexp = "^(?!^\\d+$)(?!^[ㄱ-ㅎ]+$)[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,15}$", message = "닉네임은 숫자로 이루어질 수 없으며, 15글자 이하여야 합니다.")
    private String usernickname;
    @NotBlank(message = "공백이 있으면 안됩니다.")
    @Size(min = 3, max=62, message = "3글자에서 최대 62자까지 입력할 수 있습니다.")
    @Pattern(regexp = "^(?!^\\d+$)[A-Za-z0-9]{3,62}@[A-Za-z0-9]+\\.[A-Za-z]+$", message = "이메일 형식을 지켜주세요")
    private String useremail;
    private int code;
}