package com.example.attendancesystem.model; // 修正後の1行目
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "attendance") // PostgreSQLのattendanceテーブルに対応
@Data
public class Attendance {
    @Id
    private String userId;      // ユーザーID（主キー 兼 usersへの外部キー）
    private String status;      // 勤怠状況 (出/退)
    private String workplace;   // 勤務場所
    private String phone;       // 電話番号
    private String email;       // メールアドレス
    private String checkInTime; // 出勤時刻 (HH:MM)
    private String checkOutTime;// 退勤時刻 (HH:MM)
}