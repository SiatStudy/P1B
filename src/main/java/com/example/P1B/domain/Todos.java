package com.example.P1B.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "Todos")
@NoArgsConstructor
public class Todos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tdid;

    // 할일 제목
    @Column
    private String tdtitle;

    // 할일 내용
    @Column
    private String tdcontent;

    // 할일 시작일
    @Column
    private LocalDateTime tdstartdate;

    // 할일 시작일 (연도)
    @Column
    private int tdstartyeardate;

    // 할일 종료일(계획)
    @Column
    private LocalDateTime tdenddate;

    // 할일 실제 종료일
    @Column
    private LocalDateTime dtudtdate;

    // 할일 상태
    @Column
    private int tdstatus = 0;

    // 회원 고유 식별 ID
    @ManyToOne
    @JoinColumn(name="memid")
    private Member member;

    public Todos(String tdtitle, String tdcontent, LocalDateTime tdstartdate, int tdstartyeardate, LocalDateTime tdenddate) {
        this.tdtitle = tdtitle;
        this.tdcontent = tdcontent;
        this.tdstartdate = tdstartdate;
        this.tdstartyeardate = tdstartyeardate;
        this.tdenddate = tdenddate;
    }
}
