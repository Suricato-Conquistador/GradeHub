import { api } from "../api";

const baseUrl = "/grade"

export default class Grade {
    public async getGrade() {
    }

    public async postGrade(subject: number) {
        const response = await api.post(`${baseUrl}/`, {
            subject: subject
        })
        return response.data
    }
}
