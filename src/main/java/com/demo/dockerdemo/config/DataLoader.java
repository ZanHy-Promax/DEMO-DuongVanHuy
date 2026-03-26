package com.demo.dockerdemo.config;

import com.demo.dockerdemo.entity.Product;
import com.demo.dockerdemo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            log.info("🌱 Loading sample data...");
            productRepository.saveAll(List.of(
                createProduct("Laptop Dell XPS 15", "Laptop cao cấp với màn hình 4K OLED", new BigDecimal("45000000"), 10),
                createProduct("iPhone 15 Pro", "Điện thoại thông minh với chip A17 Pro", new BigDecimal("28000000"), 25),
                createProduct("Samsung Galaxy S24", "Flagship Android với camera 200MP", new BigDecimal("22000000"), 15),
                createProduct("MacBook Air M3", "Laptop mỏng nhẹ với chip Apple M3", new BigDecimal("32000000"), 8),
                createProduct("AirPods Pro 2", "Tai nghe không dây chống ồn chủ động", new BigDecimal("6500000"), 50)
            ));
            log.info("✅ Sample data loaded: {} products", productRepository.count());
        } else {
            log.info("ℹ️ Data already exists, skipping seed.");
        }
    }

    private Product createProduct(String name, String description, BigDecimal price, int quantity) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(description);
        p.setPrice(price);
        p.setQuantity(quantity);
        return p;
    }
}
