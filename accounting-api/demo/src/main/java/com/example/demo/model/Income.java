package com.example.demo.model;

import jakarta.persistence.*;


import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal amount;
    private String incomeName;

    @Temporal(TemporalType.DATE)
    private Date incomeDate;
    @ManyToOne
    @JoinColumn(name="username")
    private User user;
    public Date getIncomeDate() {return incomeDate;}
    public void setIncomeDate(Date incomeDate ) {this.incomeDate =incomeDate;}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public String getIncomeName() {
        return incomeName;
    }
    public void setIncomeName(String incomeName) {
        this.incomeName = incomeName;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public BigDecimal getAmount() {
        return amount;
    }
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
