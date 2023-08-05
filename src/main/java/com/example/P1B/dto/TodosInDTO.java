package com.example.P1B.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

// 작성자 : 이건주

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TodosInDTO {
    
    // todo 제목
    private String tdTitle;
    
    // todo 내용
    private String tdContent;

    
    // todo 시작일자 
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime tdStartDate;

    // todo 연도만 추출
    private int tdStartYear;

    // todo 종료일자
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime tdEndDate;
}
