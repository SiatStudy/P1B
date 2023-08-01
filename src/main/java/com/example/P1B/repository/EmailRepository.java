package com.example.P1B.repository;

import com.example.P1B.domain.Email;
import com.example.P1B.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EmailRepository extends JpaRepository<Email, Long> {
    // 이메일 사용자 기준
    Email findByMember(Member member);
}
