
import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

// Initialize the database
const db = new SQLDatabase("mentorship", {
    migrations: "./migrations",
});


type GradeRequest = {
    student_id: number;
    course_id: number;
    grade: number;
    graded_date: string;
}

type GradeResponse = {
    message: string;
    status: number;
    data?: {
        student_id: number;
        course_id: number;
        grade: number;
        graded_date: string;
    };
}

// -- CREATE

export const createGrade = api(
    {
        method: "POST",
        path: "/grade",
        expose: true,
    },
    async ({...body}: GradeRequest): Promise<GradeResponse> => {
        try {
            // Insert the student and return the inserted row's id
            const result = await db.queryRow`
                INSERT INTO grade (student_id, course_id, grade, graded_date)
                VALUES (${body.student_id}, ${body.course_id}, ${body.grade}, ${body.graded_date}) 
                    RETURNING student_id, course_id, grade, graded_date
            `;

            if (!result) {
                throw new Error("Failed to insert grade");
            }

            // Log the inserted result
            console.log("INSERTED DATA - Grade: ", result);

            // Return success response with student details
            return {
                message: "Grade created successfully",
                status: 200,
                data: {
                    student_id: result.student_id,
                    course_id: result.course_id,
                    grade: result.grade,
                    graded_date: result.graded_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to create grade",
                status: 500,
            };
        }
    }
)

// -- READ

export const getGrade = api(
    {
        method: "GET",
        path: "/grade",
        expose: true,
    },
    async (): Promise<GradeResponse> => {
        try {
            const result = await db.queryRow`
                SELECT student_id, course_id, grade, graded_date
                FROM grade
            `;

            if (!result) {
                throw new Error("Failed to get grade");
            }

            console.log("SELECTED DATA - Grade: ", result);

            return {
                message: "Grade fetched successfully",
                status: 200,
                data: {
                    student_id: result.student_id,
                    course_id: result.course_id,
                    grade: result.grade,
                    graded_date: result.graded_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to fetch grade",
                status: 500,
            };
        }
    }
)

// Get grade by ID
export const getGradeByID = api(
    {
        method: "GET",
        path: "/grade/:id",
        expose: true,
    },
    async ({id}: { id: number }): Promise<GradeResponse> => {
        try {
            const result = await db.queryRow`
                SELECT *
                FROM grade
                WHERE id = ${id}
            `;
            return {
                message: "Grade fetched successfully",
                status: 200,
                data: {
                    student_id: result?.student_id,
                    course_id: result?.course_id,
                    grade: result?.grade,
                    graded_date: result?.graded_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to fetch grade",
                status: 500,
            };
        }
    }
);

// Update grade by ID
export const updateGrade = api(
    {
        method: "PUT",
        path: "/grade/:id",
        expose: true,
    },
    async ({id, ...body}: { id: number } & GradeRequest): Promise<GradeResponse> => {
        try {
            const result = await db.queryRow`
                UPDATE grade
                SET student_id = ${body.student_id},
                    course_id = ${body.course_id},
                    grade = ${body.grade},
                    graded_date = ${body.graded_date}
                WHERE id = ${id} RETURNING id, student_id, course_id, grade, graded_date
            `;
            return {
                message: "Grade updated successfully",
                status: 200,
                data: {
                    student_id: result?.student_id,
                    course_id: result?.course_id,
                    grade: result?.grade,
                    graded_date: result?.graded_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to update grade",
                status: 500,
            };
        }
    }
);

// Delete grade by ID
export const deleteGrade = api(
    {
        method: "DELETE",
        path: "/grade/:id",
        expose: true,
    },
    async ({id}: { id: number }): Promise<GradeResponse> => {
        try {
            const result = await db.queryRow`
                DELETE
                FROM grade
                WHERE id = ${id} RETURNING id
            `;
            return {
                message: "Grade deleted successfully",
                status: 200,
            };
        } catch (error) {
            return {
                message: "Failed to delete grade",
                status: 500,
            };
        }
    }
);
