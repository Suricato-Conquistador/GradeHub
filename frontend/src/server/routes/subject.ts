import { api } from "../api";

const baseUrl = "/subject";

export default class Subject {
    public async getSubject() {
        const response = await api.get(`${baseUrl}/`);
        return response.data.data.rows;
    };

    public async postSubject(nameSubject: string, teacherId: string) {
        const response = await api.post(`${baseUrl}/`, {
            name: nameSubject,
            teacherId: teacherId
        });
        return response.data;
    };
};
