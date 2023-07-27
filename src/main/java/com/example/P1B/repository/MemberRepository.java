package com.example.P1B.repository;

import com.example.P1B.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 아이디로 회원 정보 조회
    Optional<Member> findByUsername(String username);

    // 이메일로 회원 정보 조회
    Optional<Member> findByMemberEmail(String memberEmail);

    // 아이디와 이메일로 회원 정보 조회
    Member findByUsernameAndMemberEmail(String username, String memberEmail);
}
