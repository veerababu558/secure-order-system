package com.example.secureapp.controller;

import com.example.secureapp.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        System.out.println("Login attempt: " + request.getUsername());
        if ("admin".equals(request.getUsername()) && "admin".equals(request.getPassword())) {
            return JwtUtil.generateToken(request.getUsername());
        }
        throw new RuntimeException("Invalid credentials");
    }


    @GetMapping("/Hello")
    public String loginHai() {
        
        return "Hello";
    }


    static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
