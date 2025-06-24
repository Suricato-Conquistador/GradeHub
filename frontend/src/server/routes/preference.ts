import { api } from "../api";


const baseUrl = "/preference";

export default class Preference {
    public async getPreferences() {
        const response = await api.get(`${baseUrl}/`);
        return response.data.data;
    }

    public async getPreferenceById(id: number) {
        const response = await api.get(`${baseUrl}/${id}`);
        return response.data.data;
    }

    public async postPreference(name: string, description: string, versionsId: number , status: boolean) {
        const response = await api.post(`${baseUrl}/`, {
            name: name,
            description: description,
            versionId: versionsId, 
            optional: status
        });
        return response.data;
    }
}