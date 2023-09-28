package com.example.demo.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal amount;
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    public User getUser() {return user;}

    public void setUser(User user) {this.user = user;}

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public BigDecimal getAmount() {return amount;}

    public void setAmount(BigDecimal amount) {this.amount = amount;}
}
