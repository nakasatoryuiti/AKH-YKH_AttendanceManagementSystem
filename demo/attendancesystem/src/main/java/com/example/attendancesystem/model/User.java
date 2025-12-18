package com.example.attendancesystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table; // 追加
import lombok.AllArgsConstructor; // 追加
import lombok.Data;
import lombok.NoArgsConstructor;  // 追加

@Entity
@Table(name = "users") // users に修正
@Data
@NoArgsConstructor  // 引数なしのコンストラクタを作成（JPAに必須）
@AllArgsConstructor // 全てのフィールドを受け取るコンストラクタを作成（これでエラーが消えます）
public class User {
    @Id
    private String id;
    private String name;
    private String password;
    private String role;
}