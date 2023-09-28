package com.example.demo.controller;

import com.example.demo.model.Income;
import com.example.demo.payload.request.IncomeRequest;
import com.example.demo.payload.response.IncomeResponse;
import com.example.demo.payload.response.MonthlyIncomeSummaryResponse;
import com.example.demo.payload.response.UserDetailsResponse;
import com.example.demo.security.service.IncomeService;
import com.example.demo.security.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class IncomeController {

    @Autowired
    IncomeService incomeService;

    @PostMapping("/income")
    public ResponseEntity<IncomeResponse> addIncome(@RequestHeader("Authorization") String token, @RequestBody IncomeRequest incomeRequest) {
        IncomeResponse incomeResponse= incomeService.addIncome(token,incomeRequest);
        return ResponseEntity.ok(incomeResponse);
    }

   @GetMapping("/income")
    public List<IncomeResponse> listIncome(@RequestHeader("Authorization") String token) {
   List <IncomeResponse> incomeResponses= incomeService.showIncome(token);
   return incomeResponses;
   }

   @GetMapping("/income/total")
    public ResponseEntity<?> totalIncome(@RequestHeader("Authorization") String token){
      return incomeService.totalIncome(token);
   }

   @GetMapping("/income/list")
    public ResponseEntity<?> incomeList(@RequestHeader("Authorization")String token) {
        return incomeService.showListIncome(token);
   }

   @PutMapping("/income/{incomeId}")
    public ResponseEntity<?> updateIncome(@RequestHeader("Authorization") String token, @PathVariable long incomeId, @RequestBody IncomeRequest incomeRequest)
   {
       return ResponseEntity.ok(incomeService.updateIncome(token, incomeId, incomeRequest));
   }
   @GetMapping("/income/month/{monthKey}")
   public ResponseEntity<?> incomeMonthList(@RequestHeader("Authorization") String token , @PathVariable String monthKey) {
        return ResponseEntity.ok(incomeService.showIncomeMonth(token,monthKey));
   }
    @GetMapping("/income/monthlySummary")
    public List<MonthlyIncomeSummaryResponse> getMonthlyIncomeSummary(@RequestHeader("Authorization") String token) {

        List<MonthlyIncomeSummaryResponse> monthlyIncomeSummary = incomeService.getMonthlyIncomeSummary(token);
        return monthlyIncomeSummary;
    }
    @DeleteMapping("/income/{incomeId}")
    public ResponseEntity<IncomeResponse> deleteIncome(@RequestHeader("Authorization") String token, @PathVariable Long incomeId) {
        IncomeResponse deletedIncome = incomeService.deleteIncome(token, incomeId);
        if (deletedIncome != null) {return ResponseEntity.ok(deletedIncome);}
        else {return ResponseEntity.notFound().build();}
    }


}
