import { api } from "../api";

const baseUrl = "/user";

export default class User {
    public async getTeachers() {
        const response = await api.get(`${baseUrl}/userType/1`);
        // console.log(response.data.data.rows);
        return response.data.data.rows;
    };

    public async getStudents() {
        const response = await api.get(`${baseUrl}/userType/2`);
        console.log(response.data.data.rows);
        return response.data.data.rows;
    };
  
    public async deleteUser(id: number) {
        const response = await api.delete(`${baseUrl}/${id}`);
        return response.data;
    };
};
