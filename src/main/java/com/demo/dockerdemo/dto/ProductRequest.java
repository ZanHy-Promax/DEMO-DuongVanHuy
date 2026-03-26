package com.demo.dockerdemo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    @Positive(message = "Price must be positive")
    private BigDecimal price;

    private Integer quantity = 0;
}
