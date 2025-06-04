import { api } from "../api";

const baseUrl = "/subject";

export default class Subject {
    public async getSubjects() {
        const response = await api.get(`${baseUrl}/`);
        console.log(response.data.data)
        return response.data.data;
    };

    public async getSubjectById(id: number) {
        const response = await api.get(`${baseUrl}/${id}`);
        return response.data.data;
    };

    public async postSubject(nameSubject: string, teacherId: string) {
        const response = await api.post(`${baseUrl}/`, {
            name: nameSubject,
            teacherId: teacherId
        });
        return response.data;
    };
};
