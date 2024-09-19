
import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

// Initialize the database
const db = new SQLDatabase("mentorship", {
    migrations: "./migrations",
});

type EnrollmentRequest = {
    student_id: number;
    course_id: number;
    enrollment_date: string;
};

type EnrollmentResponse = {
    message: string;
    status: number;
    data?: {
        id?: number;
        student_id?: number;
        course_id?: number;
        enrollment_date?: string;
    };
};

// Create enrollment API
export const createEnrollment = api(
    {
        method: "POST",
        path: "/enrollment",
        expose: true,
    },
    async ({ ...body }: EnrollmentRequest): Promise<EnrollmentResponse> => {
        try {
            const result = await db.queryRow`
                INSERT INTO enrollment (student_id, course_id, enrollment_date)
                VALUES (${body.student_id}, ${body.course_id}, ${body.enrollment_date})
                    RETURNING id, student_id, course_id, enrollment_date
            `;
            return {
                message: "Student enrolled successfully",
                status: 200,
                data: {
                    id: result?.id,
                    student_id: result?.student_id,
                    course_id: result?.course_id,
                    enrollment_date: result?.enrollment_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to enroll student",
                status: 500,
            };
        }
    }
);

// Get enrollment by student ID API
export const getEnrollmentByStudent = api(
    {
        method: "GET",
        path: "/enrollment/student/:student_id",
        expose: true,
    },
    async ({ student_id }: { student_id: number }): Promise<EnrollmentResponse> => {
        try {
            const result = await db.queryRow`
                SELECT id, student_id, course_id, enrollment_date
                FROM enrollment
                WHERE student_id = ${student_id}
            `;
            return {
                message: "Enrollment fetched successfully",
                status: 200,
                data: {
                    id: result?.id,
                    student_id: result?.student_id,
                    course_id: result?.course_id,
                    enrollment_date: result?.enrollment_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to get enrollment",
                status: 500,
            };
        }
    }
);

// Update enrollment API
export const updateEnrollment = api(
    {
        method: "PUT",
        path: "/enrollment/:id",
        expose: true,
    },
    async ({ id, ...body }: { id: number } & EnrollmentRequest): Promise<EnrollmentResponse> => {
        try {
            const result = await db.queryRow`
                UPDATE enrollment
                SET student_id      = ${body.student_id},
                    course_id       = ${body.course_id},
                    enrollment_date = ${body.enrollment_date}
                WHERE id = ${id} RETURNING id, student_id, course_id, enrollment_date
            `;
            return {
                message: "Enrollment updated successfully",
                status: 200,
                data: {
                    id: result?.id,
                    student_id: result?.student_id,
                    course_id: result?.course_id,
                    enrollment_date: result?.enrollment_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to update enrollment",
                status: 500,
            };
        }
    }
);

// Delete enrollment API
export const deleteEnrollment = api(
    {
        method: "DELETE",
        path: "/enrollment/:id",
        expose: true,
    },
    async ({ id }: { id: number }): Promise<EnrollmentResponse> => {
        try {
            const result = await db.queryRow`
                DELETE FROM enrollment
                WHERE id = ${id} RETURNING id
            `;
            return {
                message: "Enrollment deleted successfully",
                status: 200,
                data: {
                    id: result?.id,
                },
            };
        } catch (error) {
            return {
                message: "Failed to delete enrollment",
                status: 500,
            };
        }
    }
);
