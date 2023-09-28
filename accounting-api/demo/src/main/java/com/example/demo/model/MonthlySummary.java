package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;

@Entity
public class MonthlySummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String yearMonthKey;
    private String incomeName;
    private BigDecimal totalIncome;


    // Getter ve Setter metotları
    public String getYearMonthKey() {
        return yearMonthKey;
    }
    public String getIncomeName (){
        return incomeName;

    }
    public void setIncomeName (String incomeName) {
        this.incomeName = incomeName;
    }
    public void setYearMonthKey(String yearMonthKey) {
        this.yearMonthKey = yearMonthKey;
    }

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }
}
