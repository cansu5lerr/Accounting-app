package com.example.demo.security.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.payload.response.UserDetailsResponse;
import java.util.Optional;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private JwtUtils jwtUtils;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }
   //Kullanıcı girişi


    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    //Userın profilini getiriyoruz
    public UserDetailsResponse getUserProfile (String token){
        String username = jwtUtils.extractUsername(token);
        UserDetailsResponse userDetatilsResponse = new UserDetailsResponse();
        UserDetails userDetails = null;
        if(username!= null) {
            userDetails = loadUserByUsername(username);
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            Optional<User> userOptional = userRepository.findByUsername(username);
            if(userOptional.isPresent()) {
                User user = userOptional.get();
                userDetatilsResponse.setName(user.getName());
                userDetatilsResponse.setSurname(user.getSurname());
                userDetatilsResponse.setUsername(user.getUsername());
                userDetatilsResponse.setEmail(user.getEmail());
            }
        }
        return userDetatilsResponse;
    }
    //User güncellemesi
    public UserDetailsResponse updateUserProfile(String token , UserDetailsResponse userDetailsResponse) {
        String username = jwtUtils.extractUsername(token);
        UserDetails userDetails = null;
        if(username != null) {
            userDetails = loadUserByUsername(username);
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            Optional<User> userOptional = userRepository.findByUsername(username);
            if(userOptional.isPresent()){
                User user = userOptional.get();
                user.setId(user.getId());
                user.setPassword(user.getPassword());
                user.setUsername(user.getUsername());
                user.setName(userDetailsResponse.getName());
                user.setSurname(userDetailsResponse.getSurname());
                user.setEmail(userDetailsResponse.getEmail());
                user.setRoles(user.getRoles());
                userRepository.save(user);
            }
        }
        return userDetailsResponse;
    }
    //Userın idsini çekiyoruz.
    public User getUser(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
    //burada kullanıcı authentication işlemini yapıyorum

    public User getAuthenticatedUserFromToken(String token) {
        String username = jwtUtils.extractUsername(token);
        UserDetails userDetails = null;

        if (username != null) {
            userDetails = loadUserByUsername(username);
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            Optional<User> userOptional = userRepository.findByUsername(username);

            if (userOptional.isPresent()) {
                return userOptional.get();
            }
        }

        // Eğer kullanıcı bulunamazsa veya token geçersizse null dönebilirsiniz veya bir hata işleyebilirsiniz.
        return null;
    }

}
