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
    private String SlId;

    private String SlUserid;

    private String SlNickname;

    private int SlPlatform;

    private String SlAccesstoken;

    private LocalDateTime SlExpires;

    @ManyToOne
    private Member MemId;
}
