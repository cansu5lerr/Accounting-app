package com.example.demo.payload.request;

import jakarta.validation.constraints.NotBlank;


import java.math.BigDecimal;
import java.util.Date;

public class IncomeRequest {
    @NotBlank
    private BigDecimal amount;
    @NotBlank
    private String incomeName;

    @NotBlank
    private Long userId;

    private Date incomeDate;
    public Date getIncomeDate(){return incomeDate;}
    public void setIncomeDate(Date incomeDate) {this.incomeDate= incomeDate;}
    public BigDecimal getAmount() {
        return amount;
    }
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public String getIncomeName() {
        return incomeName;
    }
    public void setIncomeName(String incomeName) {
        this.incomeName = incomeName;
    }
    public Long getUserId() {return userId; }
    public void setUserId(Long userId) {this.userId = userId;}


}
