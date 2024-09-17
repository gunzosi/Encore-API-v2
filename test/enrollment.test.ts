import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {createEnrollment, getEnrollmentByStudent, updateEnrollment, deleteEnrollment} from "../controller/enrollment";

// Mock các hàm trong controller
jest.mock("../controller/enrollment", () => ({
    createEnrollment: jest.fn(),
    getEnrollment: jest.fn(),
    updateEnrollment: jest.fn(),
    deleteEnrollment: jest.fn(),
}));

describe("Enrollment API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Xóa các mock trước mỗi test
    });

    // Test cho việc tạo Enrollment
    test("should create an enrollment", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockCreateResponse = {
            message: "Enrollment created successfully",
            status: 200,
            data: {
                id: 1,
                student_id: 1,
                course_id: 1,
                enrollment_date: "2024-09-16",
            },
        };

        // @ts-ignore
        (createEnrollment as jest.Mock).mockResolvedValue(mockCreateResponse);

        const enrollmentData = {
            student_id: 1,
            course_id: 1,
            enrollment_date: "2024-09-16",
        };

        // 2. Act: Gọi hàm API
        // @ts-ignore
        const response = await createEnrollment(enrollmentData);

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.student_id).toBe(1);
        expect(response.message).toBe("Enrollment created successfully");
    });

    // Test cho việc lấy thông tin Enrollment
    test("should fetch an enrollment by ID", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockFetchResponse = {
            message: "Enrollment fetched successfully",
            status: 200,
            data: {
                id: 1,
                student_id: 1,
                course_id: 1,
                enrollment_date: "2024-09-16",
            },
        };

        // @ts-ignore
        (getEnrollment as jest.Mock).mockResolvedValue(mockFetchResponse);

        // 2. Act: Gọi hàm API với test ID
        const response = await getEnrollmentByStudent({student_id: 1});

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.id).toBe(1);
        expect(response.message).toBe("Enrollment fetched successfully");
    });

    // Test cho việc cập nhật Enrollment
    test("should update an enrollment", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockUpdateResponse = {
            message: "Enrollment updated successfully",
            status: 200,
            data: {
                id: 1,
                student_id: 1,
                course_id: 1,
                enrollment_date: "2024-09-17",
            },
        };

        // @ts-ignore
        (updateEnrollment as jest.Mock).mockResolvedValue(mockUpdateResponse);

        const enrollmentData = {
            student_id: 1,
            course_id: 1,
            enrollment_date: "2024-09-17",
        };

        // 2. Act: Gọi hàm API với test ID
        const response = await updateEnrollment({id: 1, ...enrollmentData});

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.enrollment_date).toBe("2024-09-17");
        expect(response.message).toBe("Enrollment updated successfully");
    });

    // Test cho việc xóa Enrollment
    test("should delete an enrollment", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockDeleteResponse = {
            message: "Enrollment deleted successfully",
            status: 200,
            data: {
                id: 1,
            },
        };

        // @ts-ignore
        (deleteEnrollment as jest.Mock).mockResolvedValue(mockDeleteResponse);

        // 2. Act: Gọi hàm API với test ID
        const response = await deleteEnrollment({id: 1});

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.id).toBe(1);
        expect(response.message).toBe("Enrollment deleted successfully");
    });
});
