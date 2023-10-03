package com.example.demo.controller;
import com.example.demo.model.User;

import com.example.demo.model.Role;
import com.example.demo.model.ERole;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.payload.request.SignupRequest;
import com.example.demo.payload.response.JwtResponse;
import com.example.demo.payload.response.MessageResponse;
import com.example.demo.security.service.UserAuthService;
import com.example.demo.security.service.UserDetailsImpl;
import com.example.demo.security.service.UserDetailsServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.payload.response.UserDetailsResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    UserAuthService userAuthService;
    @Autowired
    UserDetailsServiceImpl userDetailsService;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return userAuthService.authenticateUser(loginRequest);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        return userAuthService.registerUser(signupRequest);
    }


    @GetMapping("/user/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {

        UserDetailsResponse userProfile = userDetailsService.getUserProfile(token);
        return ResponseEntity.ok(userProfile);
    }

    @PostMapping("/user/profile")
    public ResponseEntity<?> updateUserProfile(@RequestHeader("Authorization") String token, @RequestBody UserDetailsResponse userDetatilsResponse) {
        userDetatilsResponse = userDetailsService.updateUserProfile(token, userDetatilsResponse);
     return  ResponseEntity.ok(userDetatilsResponse);
    }

}
