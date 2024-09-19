-- Tạo bảng student trước
CREATE TABLE student
(
    id    BIGSERIAL PRIMARY KEY,
    name  TEXT NOT NULL,
    age   INTEGER,
    email TEXT NOT NULL
);

-- -- Tạo bảng course trước
-- CREATE TABLE course
-- (
--     id          BIGSERIAL PRIMARY KEY,
--     title       TEXT NOT NULL,
--     description TEXT,
--     start_date  DATE,
--     end_date    DATE
-- );
--
-- -- Tạo bảng enrollment trước mà không có FK
-- CREATE TABLE enrollment
-- (
--     id              BIGSERIAL PRIMARY KEY,
--     enrollment_date DATE NOT NULL
-- );
--
-- -- Thêm khóa ngoại cho enrollment sau khi bảng đã được tạo thành công
-- ALTER TABLE enrollment
--     ADD CONSTRAINT fk_student_id
--         FOREIGN KEY (student_id)
--             REFERENCES student(id)
--             ON DELETE CASCADE;
--
-- ALTER TABLE enrollment
--     ADD CONSTRAINT fk_course_id
--         FOREIGN KEY (course_id)
--             REFERENCES course(id)
--             ON DELETE CASCADE;
--
-- -- Tạo bảng grade trước mà không có FK
-- CREATE TABLE grade
-- (
--     id          BIGSERIAL PRIMARY KEY,
--     grade       INTEGER CHECK (grade >= 0 AND grade <= 100),
--     graded_date DATE NOT NULL
-- );
--
-- -- Thêm khóa ngoại cho grade sau khi bảng đã được tạo thành công
-- ALTER TABLE grade
--     ADD CONSTRAINT fk_grade_student_id
--         FOREIGN KEY (student_id)
--             REFERENCES student(id)
--             ON DELETE CASCADE;
--
-- ALTER TABLE grade
--     ADD CONSTRAINT fk_grade_course_id
--         FOREIGN KEY (course_id)
--             REFERENCES course(id)
--             ON DELETE CASCADE;
--
-- -- Tạo bảng users
-- CREATE TABLE users
-- (
--     id       BIGSERIAL PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     email    VARCHAR(255) NOT NULL UNIQUE,
--     password TEXT NOT NULL,
--     -- STUDENT or TEACHER or ADMIN
--     role     TEXT NOT NULL CHECK (role IN ('STUDENT', 'TEACHER', 'ADMIN'))
-- );
