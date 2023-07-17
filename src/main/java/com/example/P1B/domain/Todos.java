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
public class Todos {
    @Id
    @GeneratedValue
    private String TD_ID;

    private String TD_TITLE;

    private String TD_CONTENT;

    private LocalDateTime TD_START_DATE;

    private LocalDateTime TD_YD_DATE;

    private LocalDateTime TD_END_DATE;

    private LocalDateTime TD_UDT_DATE;

    private int TD_STATUS;

    @ManyToOne
    private Member MEM_ID;
}
