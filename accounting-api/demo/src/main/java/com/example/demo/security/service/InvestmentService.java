package com.example.demo.security.service;

import com.example.demo.model.Expense;
import com.example.demo.model.Income;
import com.example.demo.model.Investment;
import com.example.demo.model.User;
import com.example.demo.payload.request.ExpenseRequest;
import com.example.demo.payload.request.IncomeRequest;
import com.example.demo.payload.request.InvestmentRequest;
import com.example.demo.payload.response.ExpenseResponse;
import com.example.demo.payload.response.IncomeResponse;
import com.example.demo.payload.response.InvestmentResponse;
import com.example.demo.repository.InvestmentRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.text.DecimalFormat;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InvestmentService {
    @Autowired
    InvestmentRepository investmentRepository;
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    FormatAmountService formatAmountService;
    //Ekle fonksiyonu
    public InvestmentResponse addInvestment(String token, InvestmentRequest investmentRequest){
        User authtenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if(authtenticatedUser != null) {
            Investment investment = new Investment();
            authtenticatedUser = userDetailsService.getUser(authtenticatedUser.getId());
            investment.setAmount(investmentRequest.getAmount());
            investment.setInvestmentDate(investmentRequest.getInvestmentDate());
            investment.setInvestmentName(investmentRequest.getInvestmentName());
            investment.setUser(authtenticatedUser);
            investmentRepository.save(investment);
        }
        return showInvestmentResponse(investmentRequest);
    }
    public List<InvestmentResponse> showInvestment(String token) {
        User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if(authenticatedUser !=null) {
            List<Investment> userInvestments= investmentRepository.findByUser(authenticatedUser);
            List<InvestmentResponse> investmentResponses = userInvestments.stream()
                    .map(investment -> {
                        InvestmentResponse response = new InvestmentResponse();
                        response.setInvestmentName(investment.getInvestmentName());
                        response.setAmount(formatAmountService.formatAmount(investment.getAmount()));
                        response.setId(investment.getId());
                        response.setInvestmentDate(investment.getInvestmentDate());
                        return response;
                    }).collect(Collectors.toList());
            return investmentResponses;
        }
        return null;
    }


    //Liste şeklinde döndürüyoruz.
    public List <InvestmentResponse> showInvestmentResponseList(List<InvestmentRequest> investmentRequest){
        List<InvestmentResponse> investmentResponses = investmentRequest.stream()
                .map(request-> {
                    InvestmentResponse response = new InvestmentResponse();
                    response.setInvestmentName(request.getInvestmentName());
                    response.setInvestmentDate(request.getInvestmentDate());
                    response.setId(response.getId());
                    BigDecimal amount =request.getAmount();
                    response.setAmount(formatAmountService.formatAmount(amount));
                    return response;
                }).collect(Collectors.toList());
        return investmentResponses;
    }
    //Bir response döndürme
    public InvestmentResponse showInvestmentResponse (InvestmentRequest investmentRequest){
        InvestmentResponse investmentResponse = new InvestmentResponse();
        investmentResponse.setInvestmentName(investmentRequest.getInvestmentName());
        investmentResponse.setInvestmentDate(investmentRequest.getInvestmentDate());
        BigDecimal amount = investmentRequest.getAmount();
        investmentResponse.setAmount(formatAmountService.formatAmount(amount));
        return investmentResponse;
    }

    //toplam yatırım hesaplama
    public ResponseEntity<?> totalInvestment (String token) {
        User authenticatedUser= userDetailsService.getAuthenticatedUserFromToken(token);
        BigDecimal total = BigDecimal.ZERO;
        if(authenticatedUser != null) {
            List<Investment> userInvestments = investmentRepository.findByUser(authenticatedUser);
            for(Investment investment: userInvestments) {
                total = total.add(investment.getAmount());
            }
            Map<String ,String> response = new HashMap<>();
            response.put("totalInvestment", formatAmountService.formatAmount(total));
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kimlik doğrulama başarısız. ");
    }

    public BigDecimal totalInvestmentBudget (String token) {
        User authtenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        BigDecimal total = BigDecimal.ZERO;
        if(authtenticatedUser != null) {
            List<Investment> userInvestments = investmentRepository.findByUser(authtenticatedUser);
            for(Investment investment: userInvestments){
                total = total.add(investment.getAmount());
            }
        }
        return total;
    }
    public InvestmentResponse updateInvestment(String token, long investmentId, InvestmentRequest investmentRequest) {
        User authenticatedUser= userDetailsService.getAuthenticatedUserFromToken(token);
        if(authenticatedUser != null) {
            Investment investment = investmentRepository.findById(investmentId).orElse(null);
            if(investment !=null && investment.getUser().getId() == authenticatedUser.getId()) {
                investment.setInvestmentName(investmentRequest.getInvestmentName());
                investment.setAmount(investmentRequest.getAmount());
                investment.setInvestmentDate(investmentRequest.getInvestmentDate());
                investmentRepository.save(investment);
                InvestmentResponse investmentResponse = new InvestmentResponse();
                investmentResponse.setAmount(formatAmountService.formatAmount(investment.getAmount()));
                investmentResponse.setInvestmentDate(investment.getInvestmentDate());
                investmentResponse.setInvestmentName(investment.getInvestmentName());
                investmentResponse.setId(investment.getId());
                return investmentResponse;
            }
        }
        return null;
    }

    public InvestmentResponse deleteInvestment (String token, long investmentId) {
        User authenticatedUser= userDetailsService.getAuthenticatedUserFromToken(token);
        if(authenticatedUser != null) {
            Investment existingInvestment = investmentRepository.findById(investmentId).orElse(null);
            if(existingInvestment !=null && existingInvestment.getUser().getId() == authenticatedUser.getId()){
                investmentRepository.delete(existingInvestment);
                InvestmentResponse investmentResponse = new InvestmentResponse();
                investmentResponse.setInvestmentName(existingInvestment.getInvestmentName());
                investmentResponse.setAmount(formatAmountService.formatAmount((existingInvestment.getAmount())));
                investmentResponse.setId(existingInvestment.getId());
                investmentResponse.setInvestmentDate(existingInvestment.getInvestmentDate());
                return investmentResponse;
            }
        }
        return null;
    }
}
