package com.example.demo.security.service;

import com.example.demo.model.Budget;
import com.example.demo.payload.response.BudgetResponse;
import com.example.demo.repository.BudgetRepository;
import com.example.demo.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;
import com.example.demo.model.User;

import java.math.BigDecimal;

@Service
public class BudgetService {
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    BudgetRepository budgetRepository;
    @Autowired
    ExpenseService expenseService;
    @Autowired
    IncomeService incomeService;
    @Autowired
    InvestmentService investmentService;
    @Autowired
    FormatAmountService formatAmountService;
    public Budget getBudgetByUserId(Long userId) {
        return budgetRepository.findByUserId(userId);
    }

    public Budget updateBudget (String token) {
        User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        BigDecimal totalBudget = BigDecimal.ZERO;

        if (authenticatedUser != null) {
            Budget userBudget = getBudgetByUserId(authenticatedUser.getId());
            if (userBudget != null) {
                BigDecimal totalIncome = incomeService.totalIncomeBudget(token);
                BigDecimal totalInvestment = investmentService.totalInvestmentBudget(token);
                BigDecimal totalExpense = expenseService.totalExpenseBudget(token);
                totalBudget = totalIncome.add(totalInvestment).subtract(totalExpense);
                userBudget.setAmount(totalBudget);
                budgetRepository.save(userBudget);
                return userBudget;
            }
            else {
                    userBudget = new Budget();
                    userBudget.setUser(authenticatedUser);
                BigDecimal totalIncome = incomeService.totalIncomeBudget(token);
                BigDecimal totalInvestment = investmentService.totalInvestmentBudget(token);
                BigDecimal totalExpense = expenseService.totalExpenseBudget(token);
                totalBudget = totalIncome.add(totalInvestment).subtract(totalExpense);
                userBudget.setAmount(totalBudget);
                    budgetRepository.save(userBudget);
                    return userBudget;
            }
        }
        return null;
    }
    public BudgetResponse showBudget(String token){
        User authtenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        BigDecimal totalBudget = BigDecimal.ZERO;
        BudgetResponse budgetResponse = new BudgetResponse();
        if(authtenticatedUser != null ) {
            Budget userBudget = getBudgetByUserId(authtenticatedUser.getId());
            if (userBudget != null) {
                BigDecimal totalIncome = incomeService.totalIncomeBudget(token);
                BigDecimal totalInvestment = investmentService.totalInvestmentBudget(token);
                BigDecimal totalExpense = expenseService.totalExpenseBudget(token);
                totalBudget = totalIncome.add(totalInvestment).subtract(totalExpense);
                userBudget.setAmount(totalBudget);
                budgetRepository.save(userBudget);
                budgetResponse.setAmount(formatAmountService.formatAmount(totalBudget));
                return budgetResponse;
            }
            else {
                userBudget = new Budget();
                userBudget.setUser(authtenticatedUser);
                BigDecimal totalIncome = incomeService.totalIncomeBudget(token);
                BigDecimal totalInvestment = investmentService.totalInvestmentBudget(token);
                BigDecimal totalExpense = expenseService.totalExpenseBudget(token);
                totalBudget = totalIncome.add(totalInvestment).subtract(totalExpense);
                userBudget.setAmount(totalBudget);
                budgetRepository.save(userBudget);
                budgetResponse.setAmount(formatAmountService.formatAmount(totalBudget));
                return budgetResponse;
            }

        }
        return null;
    }
 /*   public static String formatAmount(BigDecimal amount) {
        String formattedAmount = "";
        if (amount.compareTo(new BigDecimal("1000")) >= 0) {
            BigDecimal thousands = amount.divide(new BigDecimal("1000"));
            formattedAmount = thousands.stripTrailingZeros().toPlainString() + " bin TL";
        } else {
            formattedAmount = amount.stripTrailingZeros().toPlainString() + " TL";
        }
        return formattedAmount;
    } */

}
