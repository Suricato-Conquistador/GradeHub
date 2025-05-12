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

    public async deleteUser(id: number) {
        const response = await api.delete(`${baseUrl}/${id}`)
        return response.data
    }
}
