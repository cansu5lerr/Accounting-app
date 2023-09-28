package com.example.demo.controller;
import com.example.demo.model.Investment;
import com.example.demo.payload.request.IncomeRequest;
import com.example.demo.security.service.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.payload.response.InvestmentResponse;
import com.example.demo.payload.request.InvestmentRequest;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class InvestmentController {

    @Autowired
    InvestmentService investmentService;

    @PostMapping("/investment")
    public ResponseEntity<InvestmentResponse>  addInvestment (@RequestHeader("Authorization") String token, @RequestBody InvestmentRequest investmentRequest) {
        InvestmentResponse investmentResponse = investmentService.addInvestment(token,investmentRequest);
        return ResponseEntity.ok(investmentResponse);
    }
    @GetMapping("/investment")
    public List<InvestmentResponse> listInvestment(@RequestHeader("Authorization")String token){
        List<InvestmentResponse> investmentResponses= investmentService.showInvestment(token);
        return investmentResponses;
    }
    @GetMapping("/investment/total")
    public ResponseEntity<?> totalInvestment(@RequestHeader("Authorization") String token) {
        return investmentService.totalInvestment(token);
    }
    @PutMapping("/investment/{investmentId}")
    public ResponseEntity<InvestmentResponse> updateIncome(@RequestHeader("Authorization") String token, @PathVariable long investmentId, @RequestBody InvestmentRequest investmentRequest)
    {
        return ResponseEntity.ok(investmentService.updateInvestment(token, investmentId, investmentRequest));
    }
    @DeleteMapping("/investment/{investmentId}")
    public ResponseEntity<InvestmentResponse> deleteResponse(@RequestHeader("Authorization") String token, @PathVariable Long investmentId) {
        InvestmentResponse deletedInvestment = investmentService.deleteInvestment(token, investmentId);
        if(deletedInvestment != null) {return ResponseEntity.ok(deletedInvestment);}
        else{return ResponseEntity.notFound().build();}
    }
}
