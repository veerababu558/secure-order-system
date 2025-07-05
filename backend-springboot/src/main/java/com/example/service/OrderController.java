package com.example.secureapp.controller;

import com.example.secureapp.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @GetMapping
    public String getOrders(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (JwtUtil.isTokenValid(token)) {
                String user = JwtUtil.extractUsername(token);
                return "Orders for user: " + user + " - Order-1, Order-2";
            }
        }
        return "Unauthorized";
    }
}

