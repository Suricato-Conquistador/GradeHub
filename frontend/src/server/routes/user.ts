import { api } from "../api";

const baseUrl = "/user";

export default class User {
    public async getUserById(id: number) {
        const response = await api.get(`${baseUrl}/${id}`);
        return response.data.data;
    };

    public async getLoggedUser() {
        const response = await api.get(`${baseUrl}/getLoggedUser`);
        console.log(response.data);
        return response.data.data;
    }

    public async getTeachers() {
        const response = await api.get(`${baseUrl}/userType/1`);
        // console.log(response.data.data.rows);
        return response.data.data.rows;
    };

    public async getStudents() {
        const response = await api.get(`${baseUrl}/userType/2`);
        // console.log(response.data.data.rows);
        return response.data.data.rows;
    };

    public async getStudentsBySubjectId(id: number) {
        const response = await api.get(`subjectStudents/${id}`);
        // console.log(response.data);
        return response.data;
    };

    public async patchUser(id: number, name?: string, email?: string, password?: string) {
        console.log(name)
        const response = await api.patch(`${baseUrl}/${id}`, {
            name: name,
            email: email,
            password: password
        });
        return response.data;
    };
  
    public async deleteUser(id: number) {
        const response = await api.delete(`${baseUrl}/${id}`);
        return response.data;
    };
};
