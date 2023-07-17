package com.example.P1B.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SocialLogin {
    @Id
    @GeneratedValue
    private String SL_ID;

    private String SL_USERID;

    private String SL_NICKNAME;

    private int SL_PLATFORM;

    private String SL_ACCESSTOKEN;

    private LocalDateTime SL_EXPIRES;

    @ManyToOne
    private Member MEM_ID;
}
