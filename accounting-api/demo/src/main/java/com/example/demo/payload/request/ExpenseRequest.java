package com.example.demo.payload.request;
import java.math.BigDecimal;
import java.util.Date;

public class ExpenseRequest {

    private String expenseName;
    private Long userId;
    private BigDecimal amount;
    private Date expenseDate;
    private Long id;
    public Date getExpenseDate() {return expenseDate;}
    public void setExpenseDate(Date expenseDate) {this.expenseDate=expenseDate;}
    public String getExpenseName() {return expenseName;}
    public void setExpenseName(String expenseName) {this.expenseName = expenseName;}
    public Long getUserId(){return userId;}
    public void setUserId(Long userId){this.userId= userId;}
    public BigDecimal getAmount() {return  amount;}
    public void setAmount(BigDecimal amount) {this.amount= amount;}
    public void setId(Long id) {this.id=id;}
    public Long getId(){return id;}

}
