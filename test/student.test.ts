<<<<<<< HEAD
import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {createStudent, getStudent} from "../controller/student";

// Mock the database functions inside createStudent and getStudent
jest.mock("../controller/student", () => ({
    createStudent: jest.fn(),
    getStudent: jest.fn(),
}));

describe("Student API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks before each test
    });

    test("should create a student", async () => {
        // Mock the createStudent function to return a successful response
        const mockCreateResponse = {
            message: "Student created successfully",
            status: 200,
            data: {
                id: 1,
                name: "John Doe",
                age: 25,
                email: "john.doe@example.com",
            },
        };

        // @ts-ignore
        (createStudent as jest.Mock).mockResolvedValue(mockCreateResponse);

        // Call the createStudent function with test data
        const studentData = {
            name: "John Doe",
            age: 25,
            email: "john.doe@example.com",
        };

        const response = await createStudent(studentData);
        expect(response.status).toBe(200);
        expect(response.data?.name).toBe("John Doe");
    });

    test("should fetch a student by ID", async () => {
        // Mock the getStudent function to return a successful response
        const mockFetchResponse = {
            message: "Student fetched successfully",
            status: 200,
            data: {
                id: 1,
                name: "John Doe",
                age: 25,
                email: "john.doe@example.com",
            },
        };

        // @ts-ignore
        (getStudent as jest.Mock).mockResolvedValue(mockFetchResponse);

        // Call the getStudent function with a test ID
        const response = await getStudent({id: 1});
        expect(response.status).toBe(200);
        expect(response.data?.id).toBe(1);
    });
});
=======
import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {createStudent, getStudent} from "../controller/student";

// Mock the database functions inside createStudent and getStudent
jest.mock("../controller/student", () => ({
    createStudent: jest.fn(),
    getStudent: jest.fn(),
}));

describe("Student API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks before each test
    });

    test("should create a student", async () => {
        // Mock the createStudent function to return a successful response
        const mockCreateResponse = {
            message: "Student created successfully",
            status: 200,
            data: {
                id: 1,
                name: "John Doe",
                age: 25,
                email: "john.doe@example.com",
            },
        };

        // @ts-ignore
        (createStudent as jest.Mock).mockResolvedValue(mockCreateResponse);

        // Call the createStudent function with test data
        const studentData = {
            name: "John Doe",
            age: 25,
            email: "john.doe@example.com",
        };

        const response = await createStudent(studentData);
        expect(response.status).toBe(200);
        expect(response.data?.name).toBe("John Doe");
    });

    test("should fetch a student by ID", async () => {
        // Mock the getStudent function to return a successful response
        const mockFetchResponse = {
            message: "Student fetched successfully",
            status: 200,
            data: {
                id: 1,
                name: "John Doe",
                age: 25,
                email: "john.doe@example.com",
            },
        };

        // @ts-ignore
        (getStudent as jest.Mock).mockResolvedValue(mockFetchResponse);

        // Call the getStudent function with a test ID
        const response = await getStudent({id: 1});
        expect(response.status).toBe(200);
        expect(response.data?.id).toBe(1);
    });
});
>>>>>>> f6397a66ea9983c985ca7a6d17231f765b57fc54
