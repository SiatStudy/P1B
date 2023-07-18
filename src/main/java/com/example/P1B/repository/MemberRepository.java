package com.example.P1B.repository;

import com.example.P1B.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    // 이메일 인증
    Optional<Member> findByEmail(String email);

    Member findByMemberId(String memId);
}
