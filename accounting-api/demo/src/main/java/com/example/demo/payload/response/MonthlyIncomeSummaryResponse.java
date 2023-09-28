package com.example.demo.payload.response;
import java.math.BigDecimal;

public class MonthlyIncomeSummaryResponse {
    private String yearMonthKey;
    private BigDecimal totalIncome;

    public MonthlyIncomeSummaryResponse() {this.totalIncome = BigDecimal.ZERO;}

    public String getYearMonthKey() {return yearMonthKey;}

    public void setYearMonthKey(String yearMonthKey) {this.yearMonthKey = yearMonthKey;}

    public BigDecimal getTotalIncome() {return totalIncome;}

    public void setTotalIncome(BigDecimal totalIncome) {this.totalIncome = totalIncome;}

    public void addIncome(BigDecimal income) {this.totalIncome = this.totalIncome.add(income);}
}

