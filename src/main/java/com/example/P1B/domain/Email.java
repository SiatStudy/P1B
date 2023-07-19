package com.example.P1B.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Email {
    @Id
    @GeneratedValue
    private String VrId;

    private int VrAuthCode;

    private int VrStatus;

    private LocalDateTime VrCreate;

    private LocalDateTime VrExpire;

    @OneToOne
    private Member MemId;
}
