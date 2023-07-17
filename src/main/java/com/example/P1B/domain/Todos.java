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
    private String TdId;

    private String TdTitle;

    private String TdContent;

    private LocalDateTime TdStartDate;

    private LocalDateTime TdYdDate;

    private LocalDateTime TdEndDate;

    private LocalDateTime TdUdtDate;

    private int TdStatus;

    @ManyToOne
    private Member MemId;
}
