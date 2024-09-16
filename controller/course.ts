import {SQLDatabase} from "encore.dev/storage/sqldb";
import {api} from "encore.dev/api";
import path from 'path';

// Initialize the database
const db = new SQLDatabase("course", {
    migrations: "./migrations",
});

/*const db = new SQLDatabase("course", {
    migrations: path.join("D:", "Encore", "Encore-API", "encore-ts", "controller", "migrations"),
});*/


type CourseRequest = {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
};

type CourseResponse = {
    message: string;
    status: number;
    data?: {
        id?: number;
        title?: string;
        description?: string;
        start_date?: string;
        end_date?: string;
    };
};

export const createCourse = api(
    {
        method: "POST",
        path: "/course",
        expose: true,
    },
    async ({...body}: CourseRequest): Promise<CourseResponse> => {
        try {
            const result = await db.queryRow`
                INSERT INTO course (title, description, start_date, end_date)
                VALUES (${body.title}, ${body.description}, ${body.start_date},
                        ${body.end_date}) RETURNING id, title, description, start_date, end_date
            `;
            return {
                message: "Course created successfully",
                status: 200,
                data: {
                    id: result?.id,
                    title: result?.title,
                    description: result?.description,
                    start_date: result?.start_date,
                    end_date: result?.end_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to create course",
                status: 500,
                data: {},
            };
        }
    }
)

export const getCourse = api(
    {
        method: "GET",
        path: "/course/:id",
        expose: true,
    },
    async ({id}: { id: number }): Promise<CourseResponse> => {
        try {
            const result = await db.queryRow`
                SELECT *
                FROM course
                WHERE id = ${id}
            `;
            return {
                message: "Course fetched successfully",
                status: 200,
                data: {
                    id: result?.id,
                    title: result?.title,
                    description: result?.description,
                    start_date: result?.start_date,
                    end_date: result?.end_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to fetch course",
                status: 500,
                data: {},
            };
        }
    }
)

// -- UPDATE

export const updateCourse = api(
    {
        method: "PUT",
        path: "/course/:id",
        expose: true,
    },
    async ({id, ...body}: { id: number } & CourseRequest): Promise<CourseResponse> => {
        try {
            const result = await db.queryRow`
                UPDATE course
                SET title       = ${body.title},
                    description = ${body.description},
                    start_date  = ${body.start_date},
                    end_date    = ${body.end_date}
                WHERE id = ${id} RETURNING id, title, description, start_date, end_date
            `;
            return {
                message: "Course updated successfully",
                status: 200,
                data: {
                    id: result?.id,
                    title: result?.title,
                    description: result?.description,
                    start_date: result?.start_date,
                    end_date: result?.end_date,
                },
            };
        } catch (error) {
            return {
                message: "Failed to update course",
                status: 500,
                data: {},
            };
        }
    }
);

// -- DELETE

export const deleteCourse = api(
    {
        method: "DELETE",
        path: "/course/:id",
        expose: true,
    },
    async ({id}: { id: number }): Promise<CourseResponse> => {
        try {
            const result = await db.queryRow`
                DELETE
                FROM course
                WHERE id = ${id} RETURNING id
            `;
            return {
                message: "Course deleted successfully",
                status: 200,
                data: {
                    id: result?.id,
                },
            };
        } catch (error) {
            return {
                message: "Failed to delete course",
                status: 500,
                data: {},
            };
        }
    }
)