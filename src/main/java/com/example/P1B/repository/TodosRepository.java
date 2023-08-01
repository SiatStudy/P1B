package com.example.P1B.repository;

import com.example.P1B.domain.Member;
import com.example.P1B.domain.Todos;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodosRepository extends JpaRepository<Todos, Long> {

    List<Todos> findByTdstartyeardateAndMember(int tdstartyeardate, Member member);
}
