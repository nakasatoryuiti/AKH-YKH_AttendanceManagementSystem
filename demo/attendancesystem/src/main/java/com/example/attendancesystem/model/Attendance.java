package com.example.attendancesystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "attendance")
@Data
public class Attendance {
    @Id
    private String userId;
    private String name;        // 追加：氏名を表示するために必要です
    private String status;      // 勤怠状況 (出勤中/退勤済み)
    private String workplace;   // 勤務場所
    private String phone;       // 電話番号
    private String email;       // メールアドレス
    private String checkInTime; // 出勤時刻 (HH:MM)
    private String checkOutTime;// 退勤時刻 (HH:MM)
}