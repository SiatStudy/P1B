package com.example.P1B.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodosController {
    @GetMapping("/")
    public String todosSelect(){
        return "";
    }
    @PatchMapping("/item/{plan}")
    public String patchTodosItem(){
        return "";
    }
    @PostMapping("/item/{plan}")
    public String postTodosItem(){
        return "";
    }
    @DeleteMapping("/item/{plan}")
    public String deleteTodosItem(){
        return "";
    }

}
