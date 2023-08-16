package com.example.P1B.controller;

import com.example.P1B.domain.Todos;
import com.example.P1B.domain.User;
import com.example.P1B.dto.TodosInDTO;
import com.example.P1B.service.TodosService;
import com.example.P1B.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/todos")
public class TodosController {

    private final TodosService todosService;
    private final UserService userService;

    @PostMapping("/item")
    public ResponseEntity<?> addTodos(@RequestBody TodosInDTO dto, HttpSession session) {
        System.out.println("----------- session : " + session.getAttribute("username"));
        dto.setTdStartYear(dto.getStartDate().getYear());
        User user = userService.findUser((String) session.getAttribute("username"));
        Long addedItemId = todosService.addTodos(dto.getTitle(), dto.getContent(), dto.getEndDate(), dto.getTdStartYear(), dto.getStartDate(), user);
        return new ResponseEntity<>(Map.of("isValid", true, "tdid", addedItemId), HttpStatus.OK);
    }

    @GetMapping("/{year}")
    public ResponseEntity<?> findTodos(@PathVariable("year") int year, HttpSession session){
        User user = userService.findUser((String) session.getAttribute("username"));
        List<Todos> todosList = todosService.findTodoList(year, user);
        return new ResponseEntity<>(Map.of("isValid", true, "todoList", todosList), HttpStatus.OK);
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<?> deleteTodos(@PathVariable("id") Long tdid){
        System.out.println(tdid);
        todosService.deleteTodos(tdid);
        return new ResponseEntity<>(Map.of("isValid", true), HttpStatus.OK);
    }
}
