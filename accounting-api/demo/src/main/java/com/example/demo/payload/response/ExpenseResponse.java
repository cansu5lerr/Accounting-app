package com.example.demo.payload.response;

import java.math.BigDecimal;
import java.util.Date;

public class ExpenseResponse {
    private String expenseName;
    private String amount;
    private Date expenseDate;
    private Long id;
    public Date getExpenseDate () {return expenseDate;}
    public void setExpenseDate(Date expenseDate) {this.expenseDate= expenseDate;}
    public void setExpenseName (String expenseName){this.expenseName=expenseName;}
    public String getExpenseName () {return expenseName;}

    public void setAmount (String amount) {this.amount=amount;}

    public String getAmount() {return amount;}
    public void setId(Long id) {this.id=id;}
    public Long getId(){return id;}
}
