import { stat } from "fs";
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

    public async postUserPreference(userId: number, preference: string, approved: boolean, rejected: boolean, status: boolean) {
        const response = await api.post(`${baseUrl}/`, {
            userId: userId,
            preference: preference,
            approved: approved,
            rejected: rejected,
            status: status
            
        });
        return response.data;
    };

    public async patchUserPreference(id: number, preference: string, approved: boolean, rejected: boolean, status: boolean) {
        const response = await api.patch(`${baseUrl}/${id}`, {
            preference: preference,
            approved: approved,
            rejected: rejected,
            status: status

        });
        return response.data;
    }
};