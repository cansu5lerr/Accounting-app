package com.example.demo.payload.response;

import java.math.BigDecimal;

public class MonthlyExpenseSummaryResponse {
    private String yearMonthKey;
    private BigDecimal totalExpense;

    public MonthlyExpenseSummaryResponse() {this.totalExpense = BigDecimal.ZERO;}

    public String getYearMonthKey() {return yearMonthKey;}

    public void setYearMonthKey(String yearMonthKey) {this.yearMonthKey = yearMonthKey;}

    public BigDecimal getTotalExpense() {return totalExpense;}

    public void setTotalExpense(BigDecimal totalExpense) {this.totalExpense = totalExpense;}

    public void addExpense(BigDecimal expense) {this.totalExpense = this.totalExpense.add(expense);}
}
