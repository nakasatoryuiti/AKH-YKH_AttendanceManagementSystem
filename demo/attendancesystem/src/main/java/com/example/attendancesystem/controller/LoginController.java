package com.example.attendancesystem.controller;

import com.example.attendancesystem.model.User;
import com.example.attendancesystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // フロントエンドからのアクセスを許可
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
public Map<String, String> login(@RequestBody Map<String, String> request) {
    String id = request.get("id");
    String password = request.get("password");
    
    // ターミナルに受け取った値を表示させる（デバッグ用）
    System.out.println("Login attempt: ID=" + id + ", PW=" + password);

    Map<String, String> response = new HashMap<>();
    Optional<User> userOpt = userRepository.findById(id);

    if (userOpt.isPresent()) {
        User user = userOpt.get();
        System.out.println("User found in DB: " + user.getId() + ", Pass=" + user.getPassword());
        
        if (user.getPassword().equals(password)) {
            response.put("status", "success");
            response.put("userName", user.getName());
            return response;
        }
    }
    
    response.put("status", "failed");
    return response;
}
}