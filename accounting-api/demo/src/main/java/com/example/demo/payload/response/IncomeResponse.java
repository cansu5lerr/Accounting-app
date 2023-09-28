package com.example.demo.payload.response;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.util.Date;

public class IncomeResponse {
    @NotBlank
    private String amount;
    @NotBlank
    private String incomeName;
    private Date incomeDate;
    private Long id;
    private Long userId;
    public Long getUserId() {return userId; }
    public void setUserId(Long userId) {this.userId = userId;}

    public Date getIncomeDate(){return incomeDate;}
    public void setId(Long id) {this.id=id;}
    public Long getId(){return id;}
    public void setIncomeDate(Date incomeDate) {this.incomeDate= incomeDate;}
    public String getAmount() {return amount;}
    public void setAmount(String amount) {
        this.amount = amount;
    }
    public String getIncomeName() {
        return incomeName;
    }
    public void setIncomeName(String incomeName) {
        this.incomeName = incomeName;
    }

}
