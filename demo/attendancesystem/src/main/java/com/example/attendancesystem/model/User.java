package com.example.attendancesystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users") 
@Data
public class User {
    @Id
    private String id;       
    private String password; 
    private String name;     
    private Integer roleId;  // ← 追加：データベースの role_id と合わせます
}