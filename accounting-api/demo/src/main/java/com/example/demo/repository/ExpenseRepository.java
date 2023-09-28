package com.example.demo.repository;

import com.example.demo.model.Expense;
import com.example.demo.model.Income;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense,Long > {
    List<Expense> findByUser(User user);

}
