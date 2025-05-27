import { api } from "../api";

const baseUrl = "/grade"

export default class Grade {
    public async getGrade() {
    }

    public async postGrade(subjectId: number) {
        const response = await api.post(`${baseUrl}/`, {
            subjectId: subjectId
        })
        console.log(response.data.data)
        return response.data
    }
}
