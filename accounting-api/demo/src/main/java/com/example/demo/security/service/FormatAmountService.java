package com.example.demo.security.service;

import com.example.demo.model.Expense;
import com.example.demo.model.Income;
import com.example.demo.model.Investment;
import com.example.demo.payload.request.ExpenseRequest;
import com.example.demo.payload.request.IncomeRequest;
import com.example.demo.payload.request.InvestmentRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DecimalFormat;

@Service
public class FormatAmountService {
    /*public static String formatAmount(BigDecimal amount) {
        String formattedAmount = "";

        DecimalFormat decimalFormat = new DecimalFormat("#,###");

        if (amount.compareTo(new BigDecimal("1000000")) >= 0) {
            BigDecimal millions = amount.divide(new BigDecimal("1000000"));
            BigDecimal thousands = amount.remainder(new BigDecimal("1000000")).divide(new BigDecimal("1000"));
            BigDecimal hundreds = amount.remainder(new BigDecimal("1000"));

            formattedAmount = decimalFormat.format(millions.setScale(0, BigDecimal.ROUND_DOWN)) + " milyon " +
                    decimalFormat.format(thousands) + " bin " +
                    decimalFormat.format(hundreds) + " TL";
        } else if (amount.compareTo(new BigDecimal("1000")) >= 0) {
            BigDecimal thousands = amount.divide(new BigDecimal("1000"));
            BigDecimal hundreds = amount.remainder(new BigDecimal("1000"));

            formattedAmount = decimalFormat.format(thousands) + " bin " +
                    decimalFormat.format(hundreds) + " TL";
        } else {
            formattedAmount = decimalFormat.format(amount) + " TL";
        }

        return formattedAmount;
    } */
    public static String formatAmount(BigDecimal amount) {
        String formattedAmount = "";

        DecimalFormat decimalFormat = new DecimalFormat("#,###");

        if (amount.compareTo(new BigDecimal("1000000")) >= 0) {
            BigDecimal millions = amount.divide(new BigDecimal("1000000"));
            BigDecimal thousands = amount.remainder(new BigDecimal("1000000")).divide(new BigDecimal("1000"));
            BigDecimal hundreds = amount.remainder(new BigDecimal("1000"));

            formattedAmount = decimalFormat.format(millions.setScale(0, BigDecimal.ROUND_DOWN)) + "m " +
                    decimalFormat.format(thousands.setScale(0, BigDecimal.ROUND_DOWN)) + "k " +
                    decimalFormat.format(hundreds.setScale(0,BigDecimal.ROUND_DOWN)) + " TL";
        } else if (amount.compareTo(new BigDecimal("1000")) >= 0) {
            BigDecimal thousands = amount.divide(new BigDecimal("1000"));
            BigDecimal hundreds = amount.remainder(new BigDecimal("1000"));

            formattedAmount = decimalFormat.format(thousands.setScale(0, BigDecimal.ROUND_DOWN)) + " k " +
                    decimalFormat.format(hundreds.setScale(0,BigDecimal.ROUND_DOWN)) + " TL";
        } else {
            formattedAmount = decimalFormat.format(amount) + " TL";
        }

        return formattedAmount;
    }
    public static BigDecimal formatBigdecimal(Object entity) {
        if(entity instanceof Income){
            IncomeRequest incomeRequest = new IncomeRequest();
            incomeRequest.setAmount(((Income) entity).getAmount());
            BigDecimal tutar = incomeRequest.getAmount();
            return tutar;
        }
        if(entity instanceof Expense){
            ExpenseRequest expenseRequest = new ExpenseRequest();
            expenseRequest.setAmount(((Expense) entity).getAmount());
            return expenseRequest.getAmount();
        }
        if(entity instanceof Investment){
            InvestmentRequest investmentRequest = new InvestmentRequest();
            investmentRequest.setAmount(((Investment) entity).getAmount());
            return investmentRequest.getAmount();
        }
        return null;
    }

}
