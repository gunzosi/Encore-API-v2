CREATE TABLE grade (
                       id          BIGSERIAL PRIMARY KEY,
                       student_id  BIGINT REFERENCES student (id) ON DELETE CASCADE,
                       course_id   BIGINT REFERENCES course (id) ON DELETE CASCADE,
                       grade       INTEGER CHECK (grade >= 0 AND grade <= 100),
                       graded_date DATE NOT NULL
);
