-- Sample data for demo
INSERT IGNORE INTO products (name, description, price, quantity, created_at, updated_at)
VALUES
    ('Laptop Dell XPS 15', 'Laptop cao cấp với màn hình 4K OLED', 45000000.00, 10, NOW(), NOW()),
    ('iPhone 15 Pro', 'Điện thoại thông minh với chip A17 Pro', 28000000.00, 25, NOW(), NOW()),
    ('Samsung Galaxy S24', 'Flagship Android với camera 200MP', 22000000.00, 15, NOW(), NOW()),
    ('MacBook Air M3', 'Laptop mỏng nhẹ với chip Apple M3', 32000000.00, 8, NOW(), NOW()),
    ('AirPods Pro 2', 'Tai nghe không dây chống ồn chủ động', 6500000.00, 50, NOW(), NOW());
