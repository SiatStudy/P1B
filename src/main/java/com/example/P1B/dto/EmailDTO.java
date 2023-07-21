package com.example.P1B.dto;

import com.example.P1B.domain.Email;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmailDTO {

    private UUID vrId;

    // 이메일 인증 코드
    private int vrAuthCode;

    // 이메일 인증 여부
    private int vrStatus;

    // 이메일 인증 시작 시간
    private LocalDateTime vrCreate;

    // 이메일 인증 종료 시간
    private LocalDateTime vrExpire;

    public Email toEntityEmail() {
        Email email = Email.builder()
                .vrId(vrId)
                .vrAuthCode(vrAuthCode)
                .vrStatus(vrStatus)
                .vrCreate(vrCreate)
                .vrExpire(vrExpire)
                .build();
        return email;
    }
}
