package com.example.P1B.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Todos {

    // 할일 고유 식별 ID
    @Id
    @GeneratedValue
    private String TdId;

    // 할일 제목
    private String TdTitle;

    // 할일 내용
    private String TdContent;

    // 할일 시작일
    private LocalDateTime TdStartDate;

    // 할일 시작일 (연도)
    private LocalDateTime TdYdDate;

    // 할일 종료일(계획)
    private LocalDateTime TdEndDate;

    // 할일 실제 종료일
    private LocalDateTime TdUdtDate;

    // 할일 상태
    private int TdStatus;

    // 회원 고유 식별 ID
    @ManyToOne
    @JoinColumn(name="MEM_ID")
    private Member member;
}
