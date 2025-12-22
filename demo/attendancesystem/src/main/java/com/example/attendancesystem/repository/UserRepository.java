package com.example.attendancesystem.repository; // ← ここが正しいか確認
import com.example.attendancesystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // ユーザーIDで検索する機能は、JpaRepositoryが自動的に持ってくれます
}