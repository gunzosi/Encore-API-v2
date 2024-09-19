CREATE TABLE enrollment
(
    id              BIGSERIAL PRIMARY KEY,
    student_id      BIGINT REFERENCES student (id) ON DELETE CASCADE,
    course_id       BIGINT REFERENCES course (id) ON DELETE CASCADE,
    enrollment_date DATE NOT NULL
);