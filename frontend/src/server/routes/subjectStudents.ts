import { api } from "../api";

const baseUrl = "/subjectStudents";

export default class SubjectStudents {
    public async getStudentsBySubjectId(id: number) {
        const response = await api.get(`${baseUrl}/${id}`);
        return response.data.data;
    };

    public async getSubjectsByStudentId() {
        const response = await api.get(`${baseUrl}/student`);
        console.log(response.data.data);
        return response.data.data;
    };
};
