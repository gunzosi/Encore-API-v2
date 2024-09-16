CREATE TABLE student
(
    id    BIGSERIAL PRIMARY KEY,
    name  TEXT NOT NULL,
    age   INTEGER,
    email TEXT NOT NULL
);

CREATE TABLE course
(
    id          BIGSERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT,
    start_date  DATE,
    end_date    DATE
);

CREATE TABLE enrollment
(
    id              BIGSERIAL PRIMARY KEY,
    student_id      BIGINT REFERENCES student (id),
    course_id       BIGINT REFERENCES course (id),
    enrollment_date DATE NOT NULL
);

CREATE TABLE grade
(
    id          BIGSERIAL PRIMARY KEY,
    student_id  BIGINT REFERENCES student (id),
    course_id   BIGINT REFERENCES course (id),
    grade       INTEGER CHECK (grade >= 0 AND grade <= 100),
    graded_date DATE NOT NULL
);





