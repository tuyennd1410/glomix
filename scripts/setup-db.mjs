import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// Kết nối không chỉ định database để tạo database
const connInit = await mysql.createConnection({
  host: 'database-1.cxqygms0ejwj.ap-southeast-1.rds.amazonaws.com',
  port: 3306,
  user: 'vivula',
  password: 'sYUFzD2zzU87ZmR',
});
console.log('Kết nối thành công!');
await connInit.query('CREATE DATABASE IF NOT EXISTS glomix CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
console.log('Database glomix đã sẵn sàng.');
await connInit.end();

// Kết nối lại với database glomix
const conn = await mysql.createConnection({
  host: 'database-1.cxqygms0ejwj.ap-southeast-1.rds.amazonaws.com',
  port: 3306,
  user: 'vivula',
  password: 'sYUFzD2zzU87ZmR',
  database: 'glomix',
});

await conn.execute(`
  CREATE TABLE IF NOT EXISTS leads (
    id INT NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    service_interest ENUM('AWS_Migration', 'AI_Integration', 'Both') NOT NULL,
    message TEXT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (id),
    UNIQUE KEY leads_email_key (email),
    INDEX leads_created_at_idx (created_at),
    INDEX leads_service_interest_idx (service_interest)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`);
console.log('Bảng leads đã được tạo.');

await conn.execute(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (id),
    UNIQUE KEY admin_users_username_key (username)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`);
console.log('Bảng admin_users đã được tạo.');

// Tạo admin account tuyennd/KhanhAn@0904
const passwordHash = await bcrypt.hash('KhanhAn@0904', 12);
await conn.execute(
  'INSERT INTO admin_users (username, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)',
  ['tuyennd', passwordHash]
);
console.log('Admin account tuyennd đã được tạo/cập nhật.');

await conn.end();
console.log('Hoàn thành!');
