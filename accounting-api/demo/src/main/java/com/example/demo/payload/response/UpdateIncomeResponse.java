package com.example.demo.payload.response;

import java.math.BigDecimal;
import java.util.Date;

public class UpdateIncomeResponse {

    private BigDecimal amount;
    private String incomeName;
    private Date date;
    private Long id;

    public Date getDate() {
        return date;
    }
    public void setId(Long id) {this.id=id;}
    public Long getId(){return id;}
    public void setDate(Date date) {
        this.date = date;
    }
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



}
