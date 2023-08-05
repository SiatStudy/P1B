package com.example.P1B.controller;

import com.example.P1B.domain.Todos;
import com.example.P1B.dto.TodosInDTO;
import com.example.P1B.service.CustomizeUserDetails;
import com.example.P1B.service.TodosService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 작성자 : 이건주

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/todos")
public class TodosController {

    private final TodosService todosService;

    // 할 일 페이지 요청 처리
    @GetMapping("/item")
    public String TodosPage(Model model, TodosInDTO dto){
        model.addAttribute("dto", dto);
        model.addAttribute("action","/todos/item");
        return "todos";
    }

    // 새로운 할 일 추가 요청 처리
    @PostMapping("/item")
    public String Todos(TodosInDTO dto, @AuthenticationPrincipal CustomizeUserDetails customizeUserDetails){
        dto.setTdStartYear(dto.getTdStartDate().getYear());
        todosService.addTodos(dto.getTdTitle(), dto.getTdContent(), dto.getTdEndDate(), dto.getTdStartDate(), dto.getTdStartYear(), customizeUserDetails.getUser());
        return "main";
    }

    // 특정 연도의 할 일 목록 조회 요청 처리
    @GetMapping("/{year}")
    public String findTodos(@PathVariable("year") int year, @AuthenticationPrincipal CustomizeUserDetails customizeUserDetails, Model model){
        List<Todos> todosList = todosService.findTodoList(year, customizeUserDetails.getUser());
        model.addAttribute("todoList", todosList);
        return "todoslist";
    }

    // 할 일 삭제 요청 처리
    @DeleteMapping("item/{id}")
    public String deleteTodos(@PathVariable("id") Long tdid){
        System.out.println(tdid);
        todosService.deleteTodos(tdid);
        return "redirect:/";
    }
}
