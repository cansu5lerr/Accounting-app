package com.example.demo.payload.request;

import java.math.BigDecimal;
import java.util.Date;

public class InvestmentRequest {
    private String investmentName;
    private Long userId;
    private BigDecimal amount;
    private Date investmentDate;

    public String getInvestmentName () {return investmentName;}
    public void setInvestmentName(String investmentName) {this.investmentName= investmentName;}
    public Long getUserId () {return userId;}
    public void setUserId(Long userId) {this.userId = userId;}
    public BigDecimal getAmount() {return amount;}
    public void setAmount (BigDecimal amount) {this.amount=amount;}
    public Date getInvestmentDate () {return investmentDate;}
    public void setInvestmentDate(Date investmentDate) {this.investmentDate=investmentDate;}
}
