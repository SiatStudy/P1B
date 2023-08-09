package com.example.P1B.service;

import com.example.P1B.domain.Member;
import com.example.P1B.domain.Todos;
import com.example.P1B.dto.TodosOutDTO;
import com.example.P1B.repository.TodosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodosService {
    private final TodosRepository todosRepository;

    @Transactional
    public void addTodos(String tdTitle, String tdContent, LocalDateTime tdEnd, LocalDateTime tdStart, int tdStartYear, Member member){
        Todos todos = new Todos(tdTitle, tdContent, tdEnd, tdStartYear, tdStart);
        todos.setMember(member);
        todosRepository.save(todos);
    }

    public List<Todos> findTodoList(int tdyddate, Member member){
//        /*
//            1. 요청받은 년도로 투두스 리스트 색인
//            2. 색인 해온 데이터를 OutDTO형식으로 리턴
//         */
        List<Todos> todosList = todosRepository.findByTdstartyeardateAndMember(tdyddate, member);
        return todosList;
    }

    @Transactional
    public void deleteTodos(Long tdid){
        todosRepository.deleteById(tdid);
    }

    public Todos findTodos(Long tdid){return todosRepository.findByTdid(tdid);}
}
