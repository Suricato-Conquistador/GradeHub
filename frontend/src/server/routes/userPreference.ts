import { api } from "../api";

const baseUrl = "/userPreference";

export default class UserPreference {

    

    public async getUserPreferences() {
        const response = await api.get(`${baseUrl}/`);
        return response.data.data;
    };

    public async getUserPreferenceById(id: number) {
        const response = await api.get(`${baseUrl}/${id}`);
        return response.data.data;
    };

    public async postUserPreference(studentId: number, preferenceId: number, status: boolean) {
        const response = await api.post(`${baseUrl}/`, {
            studentId: studentId,
            preferenceId: preferenceId,
            status: status,
            date: new Date() 
        });
        return response.data;
    };

    public async patchUserPreference(id: number, preference: string, status: boolean) {


            const response = await api.patch(`${baseUrl}/${id}`,{
                type: preference,
         
                status: status})
           
        return response.data;
    }
    public async getUserPreferenceByStudentId(studentId: number) {
        const response = await api.get(`${baseUrl}/student/${studentId}`);
        return response.data.data;
    }
};