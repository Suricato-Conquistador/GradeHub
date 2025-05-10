import { api } from "../api";

const baseUrl = "/user"

export default class User {
    public async getTeachers() {
        const response = await api.get(`${baseUrl}/teachers`)
        return response.data
    }

    public async getStudents() {
        const response = await api.get(`${baseUrl}/students`)
        return response.data
    }
}
