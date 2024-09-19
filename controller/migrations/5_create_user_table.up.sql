CREATE TABLE users
(
    id       BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    -- STUDENT or TEACHER or ADMIN
    role     TEXT NOT NULL CHECK (role IN ('STUDENT', 'TEACHER', 'ADMIN'))
);
