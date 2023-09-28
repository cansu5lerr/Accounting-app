package com.example.demo.config;

import com.example.demo.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import com.example.demo.model.ERole;
public class UserInfoUserDetails implements UserDetails {
    private Long id;

    public Long getId() {
        return id;
    }
    private String password;
    private List<GrantedAuthority> authorities;
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    private String name;

    public void setUsername(String username) {
        this.username = username;
    }

    private String username;


    public void setSurname(String surname) {
        this.surname = surname;
    }
    public String getSurname() {
        return surname;
    }

    private String surname;
    private String email;

    public void setEmail(String email) {
        this.email =email;
    }
    public String getEmail(){
        return email;
    }
    public UserInfoUserDetails(User userInfo) {
        id = userInfo.getId();
        name = userInfo.getName();
        surname= userInfo.getSurname();
        username= userInfo.getUsername();
        email= userInfo.getEmail();
      /*  authorities = userInfo.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList()); */
    }
    public UserInfoUserDetails(Long id, String name, String surname, String username, String email) {
       this.id =id;
        this.name = name;
        this.surname= surname;
        this.username= username;
       this.email=email;

    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
