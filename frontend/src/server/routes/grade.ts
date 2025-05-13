import { api } from "../api";

const baseUrl = "/grade"

export default class Grade {
    public async getGrade() {
    }

    public async postGrade(grade: number, subject: string, teacherId: number, studentId: number) {
        const response = await api.post(`${baseUrl}/`, {
            grade: grade,
            subject: subject,
            teacherId: teacherId,
            studentId: studentId
        })
        return response.data
    }
}
