package com.example.P1B.controller;

import com.example.P1B.domain.Todos;
import com.example.P1B.dto.TodosInDTO;
import com.example.P1B.dto.TodosOutDTO;
import com.example.P1B.repository.TodosRepository;
import com.example.P1B.service.CustomizeUserDetails;
import com.example.P1B.service.TodosService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/todos")
public class TodosController {

    private final TodosService todosService;
    private final TodosRepository todosRepository;

    @GetMapping("/item")
    public String TodosPage(Model model, TodosInDTO dto){
        model.addAttribute("dto", dto);
        model.addAttribute("action","/todos/item");
        return "todos";
    }

    @PostMapping("/item")
    public ResponseEntity<String> addTodos(
            @RequestBody @Validated TodosInDTO dto,
            @AuthenticationPrincipal CustomizeUserDetails customizeUserDetails) {

        if (dto != null) {
            dto.setTdStartYear(dto.getTdStartDate().getYear());
            todosService.addTodos(
                    dto.getTdTitle(),
                    dto.getTdContent(),
                    dto.getTdEndDate(),
                    dto.getTdStartDate(),
                    dto.getTdStartYear(),
                    customizeUserDetails.getMember());

            return ResponseEntity.ok("Todo item added successfully.");
        } else {
            return ResponseEntity.badRequest().body("Invalid input.");
        }
    }

    @GetMapping("/{year}")
    public String findTodos(@PathVariable("year") int year, @AuthenticationPrincipal CustomizeUserDetails customizeUserDetails, Model model){
        List<Todos> todosList = todosService.findTodoList(year, customizeUserDetails.getMember());
        model.addAttribute("todoList", todosList);
        return "todoslist";
    }

    @DeleteMapping("/item/{id}")
    public String deleteTodos(@PathVariable("id") Long tdid){
        System.out.println(tdid);
        todosService.deleteTodos(tdid);
        return "redirect:/";
    }

    @PatchMapping("/item")
    public String modifyTodos(@RequestParam("title") String title,
                              @RequestParam("content") String content,
                              @RequestParam("startDate") LocalDateTime startDate,
                              @RequestParam("endDate") LocalDateTime endDate,
                              @RequestParam("id") Long id){
        Todos todos = todosService.findTodos(id);
        todos.setTdtitle(title);
        todos.setTdcontent(content);
        todos.setTdstartdate(startDate);
        todos.setTdenddate(endDate);
        todosRepository.save(todos);
        return "";
    }
}
