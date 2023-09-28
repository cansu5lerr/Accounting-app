package com.example.demo.controller;

import com.example.demo.security.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.payload.response.BudgetResponse;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class BudgetController {
    @Autowired
    BudgetService budgetService;
    @GetMapping("/budget")
    public ResponseEntity<BudgetResponse> showBudget (@RequestHeader("Authorization") String token) {
        BudgetResponse budgetResponse = budgetService.showBudget(token);
        return ResponseEntity.ok(budgetResponse);
    }
}
