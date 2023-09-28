package com.example.demo.payload.response;

import java.util.Date;

public class InvestmentResponse {
    private String investmentName;
    private String amount;
    private Date investmentDate;
    private Long id;
    public void setId(Long id) {this.id=id;}
    public Long getId(){return id;}
    public String getInvestmentName () {return investmentName;}
    public void setInvestmentName(String investmentName) {this.investmentName=investmentName;}
    public String getAmount() {return amount;}
    public void setAmount(String amount) {this.amount=amount;}
    public Date getInvestmentDate() {return investmentDate;}
    public void setInvestmentDate(Date investmentDate){this.investmentDate=investmentDate;}

}
