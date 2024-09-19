import * as bcrypt from "bcrypt";
import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
// @ts-ignore
import {hashPassword,comparePassword } from "../helper/hashHelper";

// Initialize the database
const db = new SQLDatabase("mentorship", {
    migrations: "./migrations",
});

type UserResponse = {
    message: string;
    status: number;
    data?: {
        id?: number;
        username?: string;
        email?: string;
        role?: string;
    };
}

type UserRequest = {
    username: string;
    email: string;
    password: string;
    role?: string;
};



// SIGN UP ACCOUNT
export const singUpUser = api(
    {
        method: "POST",
        path: "/user/signup",
        expose: true,
    },
    async ({...body}: UserRequest): Promise<UserResponse> => {
        try {
            // Hash the password
            const hashedPassword = await hashPassword(body.password);
            const roleUser = body.role ? body.role : "STUDENT"; // Default role to 'STUDENT' if not provided

            const result = await db.queryRow`
                INSERT INTO users (username, email, password, role)
                VALUES (${body.username}, ${body.email}, ${hashedPassword}, ${roleUser})
                    RETURNING id, username, email, role
            `;

            console.log(result);
            return {
                message: "User created successfully",
                status: 200,
                data: {
                    id: result?.id,
                    username: result?.username,
                    email: result?.email,
                    role: result?.role,
                },
            };
        } catch (error) {
            console.error("Error during signup: ", error);
            return {
                message: "User creation failed",
                status: 500,
                data: {}
            };
        }
    }
);

// SIGN IN ACCOUNT
export const loginUser = api(
    {
        method: "POST",
        path: "/user/login",
        expose: true,
    },
    async ({email, password}: {email : string, password : string}): Promise<UserResponse> => {
        try {
            const result = await db.queryRow`
                SELECT * FROM users WHERE email = ${email}
            `;
            if (result) {
                const isMatch = await comparePassword(password, result.password);
                if (isMatch) {
                    return {
                        message: "User signed in successfully",
                        status: 200,
                        data: {
                            id: result?.id,
                            username: result?.username,
                            email: result?.email,
                            role: result?.role,
                        },
                    };
                } else {
                    return {
                        message: "Invalid password",
                        status: 401,
                        data: {},
                    };
                }
            }

            // Khong tim thay USER
            return {
                message: "User not found",
                status: 404,
                data: {},
            };
        } catch (error) {
            console.error("Error during login: ", error);
            return {
                message: "User sign-in failed",
                status: 500,
                data: {}
            };
        }
    }
);

// FORGOT PASSWORD
export const forgotPassword = api(
    {
        method: "POST",
        path: "/user/forgot-password",
        expose: true,
    },
    async ({...body}: UserRequest): Promise<UserResponse> => {
        try {
            const result = await db.queryRow`
                SELECT * FROM users WHERE email = ${body.email}
            `;
            if (result) {
                return {
                    message: "User found",
                    status: 200,
                    data: {
                        id: result?.id,
                        username: result?.username,
                        email: result?.email,
                        role: result?.role,
                    },
                };
            }
            return {
                message: "User not found",
                status: 404,
                data: {},
            };
        } catch (error) {
            console.error("Error during forgot password: ", error);
            return {
                message: "Failed to find user",
                status: 500,
                data: {}
            };
        }
    }
);
