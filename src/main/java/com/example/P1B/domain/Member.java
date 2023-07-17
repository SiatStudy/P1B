package com.example.P1B.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Member extends BaseTimeEntity{
    @Id
    @GeneratedValue
    private String MEM_ID;

    @Column(nullable = false)
    private String MEM_USERID;

    @Column(nullable = false)
    private String MEM_NAME;

    @Column(nullable = false)
    private String MEM_PASSWD;

    @Column(nullable = false)
    private String MEM_EMAIL;

    @Column(nullable = false)
    private String RESIGNED;

    @OneToOne
    private Email VR_ID;
}
