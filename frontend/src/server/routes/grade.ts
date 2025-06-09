import { api } from "../api";

const baseUrl = "/grade";

export default class Grade {
    public async postGrade(subjectId: number) {
        const response = await api.post(`${baseUrl}/`, {
            subjectId: subjectId
        });
        // console.log(response.data.data);
        return response.data;
    };

    public async patchGrade(id: number, grade: number) {
        const response = await api.patch(`${baseUrl}/${id}`, {
            grade: grade
        });
        return response.data;
    };
};
