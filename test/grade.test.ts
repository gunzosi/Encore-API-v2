<<<<<<< HEAD
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { createGrade, getGrade, getGradeByID, updateGrade, deleteGrade } from "../controller/grade";

// Mock các hàm trong controller
jest.mock("../controller/grade", () => ({
    createGrade: jest.fn(),
    getGrade: jest.fn(),
    getGradeByID: jest.fn(),
    updateGrade: jest.fn(),
    deleteGrade: jest.fn(),
}));

// Định nghĩa kiểu dữ liệu cho Grade
interface Grade {
    student_id: number;
    course_id: number;
    grade: number;
    graded_date: string;
}

// Định nghĩa kiểu dữ liệu cho phản hồi
interface ApiResponse<T> {
    message: string;
    status: number;
    data: T;
}

describe("Grade API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Xóa các mock trước mỗi test
    });

    // Test cho việc tạo Grade
    test("should create a grade", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockCreateResponse: ApiResponse<Grade> = {
            message: "Grade created successfully",
            status: 200,
            data: {
                student_id: 1,
                course_id: 1,
                grade: 90,
                graded_date: "2024-09-16",
            },
        };

        // @ts-ignore
        (createGrade as jest.Mock).mockResolvedValue(mockCreateResponse);

        const gradeData = {
            student_id: 1,
            course_id: 1,
            grade: 90,
            graded_date: "2024-09-16",
        };

        // 2. Act: Gọi hàm API
        const response = await createGrade(gradeData);

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.grade).toBe(90);
        expect(response.message).toBe("Grade created successfully");
    });

    // Test cho việc lấy tất cả Grade
    test("should fetch all grades", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockFetchResponse: ApiResponse<Grade[]> = {
            message: "Grades fetched successfully",
            status: 200,
            data: [
                { student_id: 1, course_id: 1, grade: 90, graded_date: "2024-09-16" },
                { student_id: 2, course_id: 2, grade: 85, graded_date: "2024-09-16" },
            ],
        };

        // @ts-ignore
        (getGrade as jest.Mock).mockResolvedValue(mockFetchResponse);

        // 2. Act: Gọi hàm API
        const response = await getGrade();

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.data.length).toBe(2); // Xóa @ts-ignore và chắc chắn response.data là một mảng
        expect(response.message).toBe("Grades fetched successfully");
    });

    // Test cho việc lấy Grade theo ID
    test("should fetch a grade by ID", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockFetchResponse: ApiResponse<Grade> = {
            message: "Grade fetched successfully",
            status: 200,
            data: {
                student_id: 1,
                course_id: 1,
                grade: 90,
                graded_date: "2024-09-16",
            },
        };

        // @ts-ignore
        (getGradeByID as jest.Mock).mockResolvedValue(mockFetchResponse);

        // 2. Act: Gọi hàm API với test ID
        const response = await getGradeByID({ id: 1 });

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.student_id).toBe(1);
        expect(response.message).toBe("Grade fetched successfully");
    });

    // Test cho việc cập nhật Grade
    test("should update a grade", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockUpdateResponse: ApiResponse<Grade> = {
            message: "Grade updated successfully",
            status: 200,
            data: {
                student_id: 1,
                course_id: 1,
                grade: 95,
                graded_date: "2024-09-17",
            },
        };

        // @ts-ignore
        (updateGrade as jest.Mock).mockResolvedValue(mockUpdateResponse);

        const gradeData = {
            student_id: 1,
            course_id: 1,
            grade: 95,
            graded_date: "2024-09-17",
        };

        // 2. Act: Gọi hàm API với test ID
        const response = await updateGrade({ id: 1, ...gradeData });

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.grade).toBe(95);
        expect(response.message).toBe("Grade updated successfully");
    });

    // Test cho việc xóa Grade
    test("should delete a grade", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockDeleteResponse: ApiResponse<{}> = {
            message: "Grade deleted successfully",
            status: 200,
            data: {},
        };

        // @ts-ignore
        (deleteGrade as jest.Mock).mockResolvedValue(mockDeleteResponse);

        // 2. Act: Gọi hàm API với test ID
        const response = await deleteGrade({ id: 1 });

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.message).toBe("Grade deleted successfully");
    });
});
=======
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { createGrade, getGrade, getGradeByID, updateGrade, deleteGrade } from "../controller/grade";

// Mock các hàm trong controller
jest.mock("../controller/grade", () => ({
    createGrade: jest.fn(),
    getGrade: jest.fn(),
    getGradeByID: jest.fn(),
    updateGrade: jest.fn(),
    deleteGrade: jest.fn(),
}));

// Định nghĩa kiểu dữ liệu cho Grade
interface Grade {
    student_id: number;
    course_id: number;
    grade: number;
    graded_date: string;
}

// Định nghĩa kiểu dữ liệu cho phản hồi
interface ApiResponse<T> {
    message: string;
    status: number;
    data: T;
}

describe("Grade API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Xóa các mock trước mỗi test
    });

    // Test cho việc tạo Grade
    test("should create a grade", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockCreateResponse: ApiResponse<Grade> = {
            message: "Grade created successfully",
            status: 200,
            data: {
                student_id: 1,
                course_id: 1,
                grade: 90,
                graded_date: "2024-09-16",
            },
        };

        // @ts-ignore
        (createGrade as jest.Mock).mockResolvedValue(mockCreateResponse);

        const gradeData = {
            student_id: 1,
            course_id: 1,
            grade: 90,
            graded_date: "2024-09-16",
        };

        // 2. Act: Gọi hàm API
        const response = await createGrade(gradeData);

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.grade).toBe(90);
        expect(response.message).toBe("Grade created successfully");
    });

    // Test cho việc lấy tất cả Grade
    test("should fetch all grades", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockFetchResponse: ApiResponse<Grade[]> = {
            message: "Grades fetched successfully",
            status: 200,
            data: [
                { student_id: 1, course_id: 1, grade: 90, graded_date: "2024-09-16" },
                { student_id: 2, course_id: 2, grade: 85, graded_date: "2024-09-16" },
            ],
        };

        // @ts-ignore
        (getGrade as jest.Mock).mockResolvedValue(mockFetchResponse);

        // 2. Act: Gọi hàm API
        const response = await getGrade();

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.data.length).toBe(2); // Xóa @ts-ignore và chắc chắn response.data là một mảng
        expect(response.message).toBe("Grades fetched successfully");
    });

    // Test cho việc lấy Grade theo ID
    test("should fetch a grade by ID", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockFetchResponse: ApiResponse<Grade> = {
            message: "Grade fetched successfully",
            status: 200,
            data: {
                student_id: 1,
                course_id: 1,
                grade: 90,
                graded_date: "2024-09-16",
            },
        };

        // @ts-ignore
        (getGradeByID as jest.Mock).mockResolvedValue(mockFetchResponse);

        // 2. Act: Gọi hàm API với test ID
        const response = await getGradeByID({ id: 1 });

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.student_id).toBe(1);
        expect(response.message).toBe("Grade fetched successfully");
    });

    // Test cho việc cập nhật Grade
    test("should update a grade", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockUpdateResponse: ApiResponse<Grade> = {
            message: "Grade updated successfully",
            status: 200,
            data: {
                student_id: 1,
                course_id: 1,
                grade: 95,
                graded_date: "2024-09-17",
            },
        };

        // @ts-ignore
        (updateGrade as jest.Mock).mockResolvedValue(mockUpdateResponse);

        const gradeData = {
            student_id: 1,
            course_id: 1,
            grade: 95,
            graded_date: "2024-09-17",
        };

        // 2. Act: Gọi hàm API với test ID
        const response = await updateGrade({ id: 1, ...gradeData });

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.data?.grade).toBe(95);
        expect(response.message).toBe("Grade updated successfully");
    });

    // Test cho việc xóa Grade
    test("should delete a grade", async () => {
        // 1. Arrange: Thiết lập dữ liệu mock
        const mockDeleteResponse: ApiResponse<{}> = {
            message: "Grade deleted successfully",
            status: 200,
            data: {},
        };

        // @ts-ignore
        (deleteGrade as jest.Mock).mockResolvedValue(mockDeleteResponse);

        // 2. Act: Gọi hàm API với test ID
        const response = await deleteGrade({ id: 1 });

        // 3. Assert: Kiểm tra kết quả
        expect(response.status).toBe(200);
        expect(response.message).toBe("Grade deleted successfully");
    });
});
>>>>>>> f6397a66ea9983c985ca7a6d17231f765b57fc54
