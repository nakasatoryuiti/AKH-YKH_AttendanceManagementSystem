package com.example.attendancesystem;

import com.example.attendancesystem.model.User;
import com.example.attendancesystem.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner initData(UserRepository repository) {
        return args -> {
            // テスト用のユーザーを作成（ID: test, Pass: 1234）
            repository.save(new User("test", "テスト太郎", "1234", "エンジニア"));
            System.out.println("テストユーザー 'test' を作成しました。");
        };
    }
}