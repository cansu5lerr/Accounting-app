package com.example.demo.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal amount;
    private String investmentName;
    @Temporal(TemporalType.DATE)
    private Date investmentDate;

    @ManyToOne
    @JoinColumn(name="userid")
    private User user;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public BigDecimal getAmount() {return amount;}
    public void setAmount(BigDecimal amount) {this.amount=amount;}
    public Date getInvestmentDate() {return investmentDate;}
    public void setInvestmentDate(Date investmentDate) {this.investmentDate=investmentDate;}
    public String getInvestmentName() {return investmentName;}
    public void setInvestmentName(String investmentName) {this.investmentName= investmentName;}

    public User getUser() {return user;}

    public void setUser(User user) {this.user = user;}


}
