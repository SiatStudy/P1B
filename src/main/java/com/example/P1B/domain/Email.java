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
    private String VR_ID;

    private int VR_AUTH_CODE;

    private int VR_STATUS;

    private LocalDateTime VR_CREATE;

    private LocalDateTime VR_EXPIRE;

    @OneToOne
    private Member MEM_ID;
}
