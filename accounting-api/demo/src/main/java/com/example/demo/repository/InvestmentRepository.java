package com.example.demo.repository;
import com.example.demo.model.Income;
import com.example.demo.model.Investment;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestmentRepository extends JpaRepository<Investment, Long> {
    List<Investment> findByUser(User user);

}
