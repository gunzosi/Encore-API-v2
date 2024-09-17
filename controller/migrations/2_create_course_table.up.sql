CREATE TABLE course (
                        id          BIGSERIAL PRIMARY KEY,
                        title       TEXT NOT NULL,
                        description TEXT,
                        start_date  DATE,
                        end_date    DATE
);