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
    private String MemId;

    @Column(nullable = false)
    private String MemUserid;

    @Column(nullable = false)
    private String MemName;

    @Column(nullable = false)
    private String MemPasswd;

    @Column(nullable = false)
    private String MemEmail;

    @Column(nullable = false)
    private String Resigned;

    @OneToOne
    private Email VrId;
}
