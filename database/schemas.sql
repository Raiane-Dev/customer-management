CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    coordinate POINT
);