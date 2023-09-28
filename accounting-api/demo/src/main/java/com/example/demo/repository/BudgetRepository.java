package com.example.demo.repository;

import com.example.demo.model.Budget;
import com.example.demo.model.Expense;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget,Long > {
    List<Budget> findByUser(User user);
    Budget findByUserId(Long userId);


}

