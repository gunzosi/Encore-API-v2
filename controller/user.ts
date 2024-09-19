import {SQLDatabase} from "encore.dev/storage/sqldb";
import {api} from "encore.dev/api";
import * as bcrypt from 'bcrypt';
// @ts-ignore
import {hashPassword, comparePassword} from "../helper/hashHelper";

// Initialize the database

const db = new SQLDatabase("mentorship", {
    migrations: "./migrations",
});

type  UserResponse = {
    message: string;
    status: number;
    data?: {
        id?: number;
        name?: string;
        email?: string;
        password?: string;
        role?: string;
    };
}

type UserRequest = {
    name: string;
    email: string;
    password: string;
    role?: string;
};


// SIGN UP ACCOUNT
export const singUpUser = api(
    {
        method: "POST",
        path : "user/signup",
        expose: true,
    },
    async ({...body}: UserRequest): Promise<UserResponse> => {
        try {
            const hashedPassword = await hashPassword(body.password);
            const roleUser = "student";
            const result = await db.queryRow`
                INSERT INTO users (name, email, password, role)
                VALUES (${body.name}, ${body.email}, ${hashedPassword}, ${roleUser}) 
                    RETURNING id, name, email, role
            `;
            return {
                message: "User created successfully",
                status: 200,
                data: {
                    id: result?.id,
                    name: result?.name,
                    email: result?.email,
                    role: result?.role,
                },
            };
        } catch (error) {
            return{
                message: "User created failed",
                status: 500,
                data : {}
            }
        }
    }
)
