package com.example.demo.controller;

import com.example.demo.payload.request.ExpenseRequest;
import com.example.demo.payload.request.IncomeRequest;
import com.example.demo.payload.response.ExpenseResponse;
import com.example.demo.payload.response.IncomeResponse;
import com.example.demo.payload.response.MonthlyExpenseSummaryResponse;
import com.example.demo.payload.response.MonthlyIncomeSummaryResponse;
import com.example.demo.security.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class ExpenseController {

    @Autowired
    ExpenseService expenseService;
    @PostMapping("/expense")
    public ResponseEntity<ExpenseResponse> addExpensive(@RequestHeader("Authorization") String token, @RequestBody ExpenseRequest expenseRequest){
        ExpenseResponse expenseResponse = expenseService.addExpense(token,expenseRequest);
        return ResponseEntity.ok(expenseResponse);
    }
    @GetMapping("/expense")
    public List <ExpenseResponse> listExpense(@RequestHeader("Authorization") String token) {
        List<ExpenseResponse> expenseResponses = expenseService.showExpense(token);
        return expenseResponses;
    }
    @GetMapping("/expense/date")
    public List<ExpenseResponse> listExpenseWithDate(@RequestHeader("Authorization") String token) {
        List<ExpenseResponse> expenseResponses = expenseService.showExpenseWithDate(token);
    return expenseResponses;
    }
    @GetMapping("expense/total")
    public ResponseEntity<?> totalExpense(@RequestHeader("Authorization") String token){
        return expenseService.totalExpense(token);
    }
    @GetMapping("/expense/monthlySummary")
    public List<MonthlyExpenseSummaryResponse> getMonthlyExpenseSummary(@RequestHeader("Authorization") String token) {
        List <MonthlyExpenseSummaryResponse> monthlyExpenseSummaryResponses= expenseService.getMonthlyExpenseSummary(token);
        return monthlyExpenseSummaryResponses;
    }
    @PutMapping("/expense/{expenseId}")
    public ResponseEntity<?> updateIncome(@RequestHeader("Authorization") String token, @PathVariable long expenseId, @RequestBody ExpenseRequest expenseRequest)
    {
        return ResponseEntity.ok(expenseService.updateExpense(token, expenseId, expenseRequest));
    }
    @DeleteMapping("/expense/{expenseId}")
    public ResponseEntity<ExpenseResponse> deleteExpense(@RequestHeader("Authorization") String token, @PathVariable Long expenseId) {
        ExpenseResponse deletedExpense = expenseService.deleteExpense(token, expenseId);
        if (deletedExpense != null) {return ResponseEntity.ok(deletedExpense);}
        else {return ResponseEntity.notFound().build();}
    }
    @GetMapping("/expense/month/{monthKey}")
    public ResponseEntity<?> expenseMonthList(@RequestHeader("Authorization") String token , @PathVariable String monthKey) {
        return ResponseEntity.ok(expenseService.showExpenseMonth(token,monthKey));
    }

}
