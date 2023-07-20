package com.example.P1B.repository;

import com.example.P1B.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {

    // 회원 아이디
    Member findByMemUserid(String memUserid);


}
