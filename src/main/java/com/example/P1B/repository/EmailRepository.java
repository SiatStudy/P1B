package com.example.P1B.repository;

import com.example.P1B.domain.Email;
import com.example.P1B.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


// 작성자 : 장재형

public interface EmailRepository extends JpaRepository<Email, Long> {
    // 이메일 사용자 기준 
    Email findByUser(User user);
}
