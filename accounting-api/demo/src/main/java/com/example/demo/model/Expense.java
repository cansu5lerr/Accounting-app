package com.example.demo.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String expenseName;

    private BigDecimal amount;
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    @Temporal(TemporalType.DATE)
    private Date expenseDate;
    public Long getId() { return id; }
    public void setId(Long id) {this.id = id;}

    public Date getExpenseDate() {return expenseDate;}
    public void setExpenseDate(Date expenseDate) {this.expenseDate=expenseDate;}
    public String getExpenseName() { return expenseName;}
    public void setExpenseName(String expenseName) {this.expenseName = expenseName;}
    public BigDecimal getAmount() {return amount;}

    public void setAmount(BigDecimal amount) {this.amount = amount;}

    public User getUser() {return user;}

    public void setUser(User user) {this.user = user;}


}
