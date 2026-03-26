package com.demo.dockerdemo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Value("${spring.application.name:docker-demo}")
    private String appName;

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        return ResponseEntity.ok(Map.of(
                "app", appName,
                "version", "1.0.0",
                "status", "UP",
                "timestamp", LocalDateTime.now().toString(),
                "message", "Spring Boot Docker Demo is running!"
        ));
    }
}
