package com.example.P1B.repository;

import com.example.P1B.domain.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;

    public Member find(Long id){
        return em.find(Member.class, id);
    }
}
