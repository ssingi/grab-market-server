-- SQLite
DROP TABLE IF EXISTS Users_backup;

INSERT
INTO Banners
VALUES
(1, 'uploads/banners/banner1.png', '/', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'uploads/banners/banner2.png', '/', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT
INTO Users
VALUES
('user1', '$2b$10$Ybb3nW8dxrK63PAIbtML/uGgad4hXunDKobz6dy0qtxu/JlpZg5Ri', 'qwer1@gmail.com', '준영', null, CURRENT_TIMESTAMP, 0, null, CURRENT_TIMESTAMP),
('user2', '$2b$10$CCjaf699VL6y6hNqENhVw.hjNxRbDX58tNjklKsRr9Htv4x42sQZm', 'qwer2@gmail.com', '세영', null, CURRENT_TIMESTAMP, 0, null, CURRENT_TIMESTAMP),
('user3', '$2b$10$hRpdQpqJ/Fs8UfVxTfBR5uGlmsiLF5zhLrjx/14rNA/lEpQiMZdcy', 'qwer3@gmail.com', '찬호', null, CURRENT_TIMESTAMP, 0, null, CURRENT_TIMESTAMP);

INSERT
INTO Products
VALUES
(1, '농구공', 5000, 'user1', '가벼운 농구공', 3, 'uploads/basketball1.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);