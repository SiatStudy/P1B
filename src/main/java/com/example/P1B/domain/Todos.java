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
    @Column(name = "TD_ID", nullable = false)
    private Long tdid;

    // 할일 제목
    @Column(name = "TD_TITLE", nullable = false)
    private String tdtitle;

    // 할일 내용
    @Column(name = "TD_CONTENT", nullable = false)
    private String tdcontent;

    // 할일 시작일
    @Column(name = "TD_START_DATE", nullable = false)
    private LocalDateTime tdstartdate;

    // 할일 시작일 (연도)
    @Column(name = "TD_YD_DATE", nullable = false)
    private int tdstartyeardate;

    // 할일 종료일(계획)
    @Column(name = "TD_END_DATE", nullable = false)
    private LocalDateTime tdenddate;

    // 할일 실제 종료일
    @Column(name = "TD_UDT_DATE")
    private LocalDateTime dtudtdate;

    // 할일 상태
    @Column(name = "TD_STATUS")
    private int tdstatus = 0;

    // 회원 고유 식별 ID
    @ManyToOne
    @JoinColumn(name="MEM_ID")
    private User user;

    public Todos(String tdtitle, String tdcontent, LocalDateTime tdstartdate, int tdstartyeardate, LocalDateTime tdenddate) {
        this.tdtitle = tdtitle;
        this.tdcontent = tdcontent;
        this.tdstartdate = tdstartdate;
        this.tdstartyeardate = tdstartyeardate;
        this.tdenddate = tdenddate;
    }
}
