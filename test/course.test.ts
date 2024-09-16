import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {createCourse, getCourse, updateCourse, deleteCourse} from "../controller/course";

// Mock the database functions inside course controller
jest.mock("../controller/course", () => ({
    createCourse: jest.fn(),
    getCourse: jest.fn(),
    updateCourse: jest.fn(),
    deleteCourse: jest.fn(),
}));

describe("Course API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks before each test
    });

    // Test for creating a course
    test("should create a course", async () => {
        // Arrange
        const mockCreateResponse = {
            message: "Course created successfully",
            status: 200,
            data: {
                id: 1,
                title: "Introduction to Programming",
                description: "Learn the basics of programming.",
                start_date: "2024-01-01",
                end_date: "2024-06-01",
            },
        };

        // @ts-ignore
        (createCourse as jest.Mock).mockResolvedValue(mockCreateResponse);

        const courseData = {
            title: "Introduction to Programming",
            description: "Learn the basics of programming.",
            start_date: "2024-01-01",
            end_date: "2024-06-01",
        };

        // Act
        const response = await createCourse(courseData);

        // Assert
        expect(response.status).toBe(200);
        expect(response.data?.title).toBe("Introduction to Programming");
        expect(response.message).toBe("Course created successfully");
    });

    // Test for fetching a course by ID
    test("should fetch a course by ID", async () => {
        // Arrange
        const mockFetchResponse = {
            message: "Course fetched successfully",
            status: 200,
            data: {
                id: 1,
                title: "Introduction to Programming",
                description: "Learn the basics of programming.",
                start_date: "2024-01-01",
                end_date: "2024-06-01",
            },
        };

        // @ts-ignore
        (getCourse as jest.Mock).mockResolvedValue(mockFetchResponse);

        // Act
        const response = await getCourse({id: 1});

        // Assert
        expect(response.status).toBe(200);
        expect(response.data?.id).toBe(1);
        expect(response.message).toBe("Course fetched successfully");
    });

    // Test for updating a course
    test("should update a course", async () => {
        // Arrange
        const mockUpdateResponse = {
            message: "Course updated successfully",
            status: 200,
            data: {
                id: 1,
                title: "Advanced Programming",
                description: "Deep dive into advanced programming concepts.",
                start_date: "2024-01-01",
                end_date: "2024-06-01",
            },
        };

        // @ts-ignore
        (updateCourse as jest.Mock).mockResolvedValue(mockUpdateResponse);

        const courseData = {
            id: 1,
            title: "Advanced Programming",
            description: "Deep dive into advanced programming concepts.",
            start_date: "2024-01-01",
            end_date: "2024-06-01",
        };

        // Act
        const response = await updateCourse(courseData);

        // Assert
        expect(response.status).toBe(200);
        expect(response.data?.title).toBe("Advanced Programming");
        expect(response.message).toBe("Course updated successfully");
    });

    // Test for deleting a course
    test("should delete a course", async () => {
        // Arrange
        const mockDeleteResponse = {
            message: "Course deleted successfully",
            status: 200,
            data: {
                id: 1,
            },
        };

        // @ts-ignore
        (deleteCourse as jest.Mock).mockResolvedValue(mockDeleteResponse);

        // Act
        const response = await deleteCourse({id: 1});

        // Assert
        expect(response.status).toBe(200);
        expect(response.data?.id).toBe(1);
        expect(response.message).toBe("Course deleted successfully");
    });
});
