package com.example.P1B.repository;

import com.example.P1B.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 작업자 : 장재형

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 아이디로 회원 정보 조회
    Optional<User> findByUsername(String username);

    // 이메일로 회원 정보 조회
    User findByUserEmail(String userEmail);

    // 아이디와 이메일로 회원 정보 조회
    User findByUsernameAndUserEmail(String username, String userEmail);
}
