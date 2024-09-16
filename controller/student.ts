import { SQLDatabase } from "encore.dev/storage/sqldb";
import { api } from "encore.dev/api";

// Initialize the database
const db = new SQLDatabase("student", {
    migrations: "./migrations",
});

// Define data types for API responses
interface Student {
    message: string;
    status: number;
    data?: {
        id?: number;
        name?: string;
        age?: number;
        email?: string;
    };
}

type CreateStudentRequest = {
    name: string;
    age: number;
    email: string;
};

// Create student API
export const createStudent = api(
    {
        method: "POST",
        path: "/student",
        expose: true,
    },
    async ({ ...body }: CreateStudentRequest): Promise<Student> => {
        try {
            // Insert the student and return the inserted row's id
            const result = await db.queryRow`
                INSERT INTO student (name, age, email) 
                VALUES (${body.name}, ${body.age}, ${body.email}) 
                RETURNING id, name, age, email
            `;

            if (!result) {
                throw new Error("Failed to insert student");
            }

            // Log the inserted result
            console.log("INSERTED DATA: ", result);

            // Return success response with student details
            return {
                message: "Student created successfully",
                status: 200,
                data: {
                    id: result.id,
                    name: result.name,
                    age: result.age,
                    email: result.email,
                },
            };
        } catch (error) {
            console.error("Error inserting student:", error);
            return {
                message: "Failed to create student",
                status: 500,
            };
        }
    }
);

// Get student API by ID
export const getStudent = api(
    {
        method: "GET",
        path : "/student/:id",
        expose: true,
    },
    async ({ id }: { id: number }): Promise<Student> => {
        try {
            // Fetch student by ID
            const result = await db.queryRow`
                SELECT * FROM student WHERE id = ${id}
            `;

            if (!result) {
                throw new Error("Student not found");
            }

            // Log the fetched result
            console.log("FETCHED DATA: ", result);

            // Return success response with student details
            return {
                message: "Student fetched successfully",
                status: 200,
                data: {
                    id: result.id,
                    name: result.name,
                    age: result.age,
                    email: result.email,
                },
            };
        } catch (error) {
            console.error("Error fetching student:", error);
            return {
                message: "Failed to fetch student",
                status: 500,
            };
        }
    }
);

// Update student API by ID
export const updateStudent = api(
    {
        method: "PUT",
        path : "/student/:id",
        expose: true,
    },

    async ({ id, ...body }: { id: number } & CreateStudentRequest): Promise<Student> => {
        try {
            // Update student by ID
            const result = await db.queryRow`
                UPDATE student 
                SET name = ${body.name}, age = ${body.age}, email = ${body.email}
                WHERE id = ${id}
                RETURNING id, name, age, email
            `;

            if (!result) {
                throw new Error("Student not found");
            }

            // Log the updated result
            console.log("UPDATED DATA: ", result);

            // Return success response with student details
            return {
                message: "Student updated successfully",
                status: 200,
                data: {
                    id: result.id,
                    name: result.name,
                    age: result.age,
                    email: result.email,
                },
            };
        } catch (error) {
            console.error("Error updating student:", error);
            return {
                message: "Failed to update student",
                status: 500,
            };
        }
    }
);

// Delete student API by ID
export const deleteStudent = api(
    {
        method : "DELETE",
        path : "/student/:id",
        expose: true,
    },
    async ({ id }: { id: number }): Promise<Student> => {
        try {
            // Delete student by ID
            const result = await db.queryRow`
                DELETE FROM student WHERE id = ${id} RETURNING id
            `;

            if (!result) {
                throw new Error("Student not found");
            }

            // Log the deleted result
            console.log("DELETED DATA: ", result);

            // Return success response
            return {
                message: "Student deleted successfully",
                status: 200,
            };
        } catch (error) {
            console.error("Error deleting student:", error);
            return {
                message: "Failed to delete student",
                status: 500,
            };
        }
    }
);