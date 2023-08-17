package com.example.P1B.service;

import com.example.P1B.domain.User;
import com.example.P1B.domain.Todos;
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
    public Long addTodos(String tdtitle, String tdcontent, LocalDateTime tdstartdate, int tdstartyeardate, LocalDateTime tdenddate, User user) {
        Todos newTodo = new Todos(tdtitle, tdcontent, tdstartdate, tdstartyeardate, tdenddate);
        newTodo.setUser(user);
        Todos savedTodo = todosRepository.save(newTodo);
        return savedTodo.getTdid(); // 추가한 아이템의 PK 반환
    }

    public List<Todos> findTodoList(User user){
//        /*
//            1. 요청받은 년도로 투두스 리스트 색인
//            2. 색인 해온 데이터를 OutDTO형식으로 리턴
//         */
        List<Todos> todosList = todosRepository.findByUser(user);
        return todosList;
    }

    @Transactional
    public void deleteTodos(Long tdid){
        todosRepository.deleteById(tdid);
    }

    @Transactional
    public void patchTodos(Long tdid) {
        Todos todo = todosRepository.findByTdid(tdid);
        if (todo.getTdstatus() == 0){
            todo.setTdstatus(1);
        } else {
            todo.setTdstatus(0);
        }
        todosRepository.save(todo);
    }
}
