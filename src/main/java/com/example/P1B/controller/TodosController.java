package com.example.P1B.controller;

import com.example.P1B.domain.Todos;
import com.example.P1B.dto.TodosInDTO;
import com.example.P1B.dto.TodosOutDTO;
import com.example.P1B.service.CustomizeUserDetails;
import com.example.P1B.service.TodosService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/todos")
public class TodosController {

    private final TodosService todosService;

    @GetMapping("/item")
    public String TodosPage(Model model, TodosInDTO dto){
        model.addAttribute("dto", dto);
        model.addAttribute("action","/todos/item");
        return "todos";
    }

    @PostMapping("/item")
    public String Todos(TodosInDTO dto, @AuthenticationPrincipal CustomizeUserDetails customizeUserDetails){
        dto.setTdStartYear(dto.getTdStartDate().getYear());
        todosService.addTodos(dto.getTdTitle(), dto.getTdContent(), dto.getTdEndDate(), dto.getTdStartDate(), dto.getTdStartYear(), customizeUserDetails.getMember());
        return "main";
    }

    @GetMapping("/{year}")
    public String findTodos(@PathVariable("year") int year, @AuthenticationPrincipal CustomizeUserDetails customizeUserDetails, Model model){
        System.out.println("**************** year : " + year + "**********************");
        List<Todos> todosList = todosService.findTodoList(year, customizeUserDetails.getMember());
        System.out.println("************** todos :" + todosList + "******************");
        return "todoslist";
    }
}
