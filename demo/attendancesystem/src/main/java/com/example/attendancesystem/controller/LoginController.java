package com.example.attendancesystem.controller;

import com.example.attendancesystem.model.User;
import com.example.attendancesystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // フロントエンドからのアクセスを許可
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData) {
        String id = loginData.get("id");
        String password = loginData.get("password");

        // データベースからユーザーを探す
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return "success";
        } else {
            return "fail";
        }
    }
}