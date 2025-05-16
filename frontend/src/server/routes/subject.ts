import { api } from "../api";

const baseUrl = "/subject";

export default class Subject {
    public async getSubject() {
        
    };

    public async postSubject(nameSubject: string, teacherId: string) {
        const response = await api.post(`${baseUrl}/`, {
            name: nameSubject,
            teacherId: teacherId
        });
        return response.data;
    };
};
