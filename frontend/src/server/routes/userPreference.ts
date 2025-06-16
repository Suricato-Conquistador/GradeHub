import { stat } from "fs";
import { api } from "../api";

const baseUrl = "/userPreferences";

export default class UserPreference {
    public async getUserPreferences() {
        const response = await api.get(`${baseUrl}/`);
        return response.data.data;
    };

    public async getUserPreferenceById(id: number) {
        const response = await api.get(`${baseUrl}/${id}`);
        return response.data.data;
    };

    public async postUserPreference(userId: number, preference: string, approved: boolean, rejected: boolean, status: boolean) {
        const approvedDate = approved ? new Date(Date.now()) : null;
        const rejectedDate = rejected ? new Date(Date.now()) : null;
        console.log(approvedDate, rejectedDate);
        
        const response = await api.post(`${baseUrl}/`, {
            studentId: userId,
            type: preference,
            approved: approvedDate,
            rejected: rejectedDate,
            status: status
            
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