package com.example.attendancesystem.controller;

import com.example.attendancesystem.model.Attendance;
import com.example.attendancesystem.repository.AttendanceRepository;
import com.example.attendancesystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;
    
    @Autowired
    private UserRepository userRepository;

    // 1. 出勤・退勤 (PUT /api/attendance/punch)
    @PutMapping("/punch")
    public Map<String, Object> punch(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String type = request.get("type");
        String time = request.get("time");

        // usersテーブルから氏名を取得
        String userName = userRepository.findById(userId)
                            .map(user -> user.getName())
                            .orElse("不明なユーザー");

        Attendance attendance = attendanceRepository.findById(userId)
                .orElse(new Attendance());

        attendance.setUserId(userId);
        attendance.setName(userName); // 取得した氏名をセット

        if ("IN".equals(type)) {
            attendance.setCheckInTime(time);
            attendance.setStatus("出勤中");
        } else {
            attendance.setCheckOutTime(time);
            attendance.setStatus("退勤済み");
        }

        attendanceRepository.save(attendance);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", type.equals("IN") ? "出勤を記録しました" : "退勤を記録しました");
        return response;
    }

    // 2. 一括登録 (PUT /api/attendance/batch)
    @PutMapping("/batch")
    public Map<String, Object> batchUpdate(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        
        Attendance attendance = attendanceRepository.findById(userId)
                .orElse(new Attendance());

        attendance.setUserId(userId);
        attendance.setWorkplace(request.get("workplace"));
        attendance.setPhone(request.get("phone"));
        attendance.setEmail(request.get("email"));

        attendanceRepository.save(attendance);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }

    // 3. 一覧取得 (GET /api/attendance/list)
    @GetMapping("/list")
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }
}