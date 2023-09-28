package com.example.demo.security.service;

import com.example.demo.model.Expense;
import com.example.demo.model.Income;
import com.example.demo.model.User;
import com.example.demo.payload.request.ExpenseRequest;
import com.example.demo.payload.request.IncomeRequest;
import com.example.demo.payload.response.ExpenseResponse;
import com.example.demo.payload.response.IncomeResponse;
import com.example.demo.payload.response.MonthlyExpenseSummaryResponse;
import com.example.demo.payload.response.MonthlyIncomeSummaryResponse;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    ExpenseRepository expenseRepository;
    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    FormatAmountService formatAmountService;
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    public ExpenseResponse addExpense (String token , ExpenseRequest expenseRequest) {
        User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if (authenticatedUser != null) {
            Expense expense = new Expense();
            authenticatedUser = userDetailsService.getUser(authenticatedUser.getId());
            expense.setExpenseName(expenseRequest.getExpenseName());
            expense.setAmount(expenseRequest.getAmount());
            expense.setUser(authenticatedUser);
            expense.setExpenseDate(expenseRequest.getExpenseDate());
            expenseRepository.save(expense);
            ExpenseResponse expenseResponse = new ExpenseResponse();
            expenseResponse.setExpenseName(expenseRequest.getExpenseName());
            BigDecimal amount = expense.getAmount();
            expenseResponse.setAmount(formatAmountService.formatAmount(amount));
            expenseResponse.setExpenseDate(expenseRequest.getExpenseDate());
            return expenseResponse;
        }
       return null;
    }

    /*public List <ExpenseResponse> showExpense(String token) {
        User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if (authenticatedUser!= null) {
            List<Expense> userExpenses = expenseRepository.findByUser(authenticatedUser);
            List<ExpenseRequest> expenseRequests = userExpenses.stream()
                    .map(expense -> {
                        ExpenseRequest request = new ExpenseRequest();
                        request.setExpenseName(expense.getExpenseName());
                        request.setAmount(expense.getAmount());
                        request.setExpenseDate(expense.getExpenseDate());
                        return request;
                    })
                    .collect(Collectors.toList());
            return showExpenseResponseList(expenseRequests);
        }
        return null;
    } */
    public List<ExpenseResponse> showExpense(String token) {
        User authtenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if(authtenticatedUser !=null){
            List<Expense> userExpenses = expenseRepository.findByUser(authtenticatedUser);
            List<ExpenseResponse> expenseResponses= userExpenses.stream()
                    .map(expense -> {
                      ExpenseResponse response = new ExpenseResponse();
                      response.setExpenseName(expense.getExpenseName());
                      response.setExpenseDate(expense.getExpenseDate());
                      response.setAmount(formatAmountService.formatAmount(expense.getAmount()));
                      response.setId(expense.getId());
                      return response;
                    })
                    .collect(Collectors.toList());
            return expenseResponses;
        }
        return null;
    }

    public List<ExpenseResponse> showExpenseResponseList (List<ExpenseRequest> expenseRequest) {
        List <ExpenseResponse> expenseResponses = expenseRequest.stream()
                .map(request-> {
                    ExpenseResponse response = new ExpenseResponse();
                    response.setExpenseName(request.getExpenseName());
                    BigDecimal amount = request.getAmount();
                    response.setAmount(formatAmountService.formatAmount(amount));
                    response.setExpenseDate(request.getExpenseDate());
                    return response;
                }).collect(Collectors.toList());
        return expenseResponses;
    }

    public ResponseEntity<?> totalExpense (String token) {
        User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        BigDecimal total = BigDecimal.ZERO;
        if(authenticatedUser != null) {
            List<Expense> userExpenses = expenseRepository.findByUser(authenticatedUser);
            for(Expense expense: userExpenses) {
                total = total.add(expense.getAmount());
            }
            Map<String,String> response = new HashMap<>();
            response.put("totalExpense", formatAmountService.formatAmount(total));
            return ResponseEntity.ok(response);
        }
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kimlik doğrulama başarısız. ");
    }
    public BigDecimal totalExpenseBudget (String token) {
        User authtenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        BigDecimal total = BigDecimal.ZERO;
        if(authtenticatedUser != null) {
            List<Expense> userExpenses = expenseRepository.findByUser(authtenticatedUser);
            for(Expense expense: userExpenses){
                total = total.add(expense.getAmount());
            }
        }
        return total;
    }
    public List <ExpenseResponse> showExpenseWithDate(String token) {
        User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if (authenticatedUser != null) {
            List<Expense> userExpenses = expenseRepository.findByUser(authenticatedUser);
            Date currentDate = new Date();
            List<ExpenseRequest> expenseRequests = userExpenses.stream()
                    .filter(expense -> !expense.getExpenseDate().before(currentDate))
                    .sorted(Comparator.comparing(Expense::getExpenseDate))
                    .map(expense -> {
                        ExpenseRequest request = new ExpenseRequest();
                        request.setExpenseName(expense.getExpenseName());
                        request.setAmount(expense.getAmount());
                        request.setExpenseDate(expense.getExpenseDate());
                        return request;
                    })
                    .collect(Collectors.toList());

            return showExpenseResponseList(expenseRequests);
        }
        return null;
    }
    public ResponseEntity<?> sortExpensesByDate(List<Expense> expenses) {
        Collections.sort(expenses, Comparator.comparing(Expense::getExpenseDate));
    return ResponseEntity.ok(expenses);
    }
 //Gider Güncelleme
    public ExpenseResponse updateExpense(String token, long expenseId, ExpenseRequest expenseRequest) {
        User authenticatedUser= userDetailsService.getAuthenticatedUserFromToken(token);
        if(authenticatedUser !=null) {
            Expense existingExpense = expenseRepository.findById(expenseId).orElse(null);
            if(existingExpense != null && existingExpense.getUser().getId() == authenticatedUser.getId()) {
                existingExpense.setExpenseName(expenseRequest.getExpenseName());
                existingExpense.setAmount(expenseRequest.getAmount());
                existingExpense.setExpenseDate(expenseRequest.getExpenseDate());
                expenseRepository.save(existingExpense);
                ExpenseResponse expenseResponse = new ExpenseResponse();
                expenseResponse.setExpenseName(existingExpense.getExpenseName());
                expenseResponse.setAmount(formatAmountService.formatAmount(existingExpense.getAmount()));
                expenseResponse.setId(existingExpense.getId());
                expenseResponse.setExpenseDate(existingExpense.getExpenseDate());
                return expenseResponse;
            }
        }
        return null;
    }
    public List<MonthlyExpenseSummaryResponse> getMonthlyExpenseSummary(String token) {
        User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if(authenticatedUser == null) {
            return null;
        }
        List<Expense> userExpenses = expenseRepository.findByUser(authenticatedUser);
        Map<String, BigDecimal> monthlySummaries = new HashMap<> ();
        LocalDate currentDate = LocalDate.now();
        int currentYear= currentDate.getYear();
        userExpenses.forEach(expense -> {
            Date date = expense.getExpenseDate();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            int year = calendar.get(Calendar.YEAR);
             if(year== currentYear) {
            String yearMonthKey= getYearMonthKey(expense.getExpenseDate());
            BigDecimal totalExpense = monthlySummaries.getOrDefault(yearMonthKey,BigDecimal.ZERO);
            totalExpense = totalExpense.add(expense.getAmount());
            monthlySummaries.put(yearMonthKey,totalExpense);
            }
        });
        List<MonthlyExpenseSummaryResponse> result = monthlySummaries
                .entrySet().stream()
                .map(entry -> {
                    MonthlyExpenseSummaryResponse summaryResponse = new MonthlyExpenseSummaryResponse();
                    summaryResponse.setYearMonthKey(entry.getKey());
                    summaryResponse.setTotalExpense(entry.getValue());
                    return summaryResponse;
                })
                .collect(Collectors.toList());
        return result;

    }
    public List<ExpenseResponse> showExpenseMonth (String token, String yearMonthKey) {
        User authtenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if(authtenticatedUser != null) {
            List<Expense> userExpenses = expenseRepository.findByUser(authtenticatedUser);
            Map<String, BigDecimal>expenseMap = new HashMap<>();
            LocalDate currentDate = LocalDate.now();
            int currentYear= currentDate.getYear();
            for (Expense expense : userExpenses) {
                Date expenseDate = expense.getExpenseDate();
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(expenseDate);
                int year = calendar.get(Calendar.YEAR);
                if(currentYear==year){
                    String yearMonthKeys = getMonth(expenseDate);
                    if(yearMonthKeys.equals(yearMonthKey)){
                        BigDecimal totalExpense = expense.getAmount();
                        String expenseName = expense.getExpenseName();
                        expenseMap.put(expenseName, totalExpense);
                    }
                }

            }

            List<ExpenseResponse>  expenseResponses =  expenseMap.entrySet().stream()
                    .map(entry -> {
                         ExpenseResponse summary = new ExpenseResponse();
                        summary.setExpenseName(entry.getKey());
                        summary.setAmount(formatAmountService.formatAmount(entry.getValue()));
                        return summary;
                    })
                    .collect(Collectors.toList());

            return expenseResponses;
        }
        return null;
    }
    private String getYearMonthKey(Date date) { //Date nesnesinden yıl ve ay bilgisini çıkarmak için yazıyoruz.
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        return year + "-" + (month < 10 ? "0" + month : month);
    }
    public ExpenseResponse deleteExpense (String token, long expenseId) {
        User authenticatedUser= userDetailsService.getAuthenticatedUserFromToken(token);
        if(authenticatedUser !=null) {
            Expense existingExpense = expenseRepository.findById(expenseId).orElse(null);
            if(existingExpense != null && existingExpense.getUser().getId() == authenticatedUser.getId()) {
                expenseRepository.delete(existingExpense);
                ExpenseResponse expenseResponse = new ExpenseResponse();
                expenseResponse.setExpenseName(existingExpense.getExpenseName());
                expenseResponse.setAmount(formatAmountService.formatAmount(existingExpense.getAmount()));
                expenseResponse.setId(existingExpense.getId());
                expenseResponse.setExpenseDate(existingExpense.getExpenseDate());
                return expenseResponse;
            }
        }
        return null;
    }
    private String getMonth (Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int month = calendar.get(Calendar.MONTH)+1;
        String monthAsString = (month < 10 ? "0" + month : String.valueOf(month));

        return monthAsString;
    }
}
