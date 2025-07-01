import { api } from "../api";

const baseUrl = "/preferenceVersion";

export default class PreferenceVersion {
    public async getPreferenceVersions() {
        const response = await api.get(`${baseUrl}/`);
        return response.data.data;
    }

    public async getPreferenceVersionById(id: number) {
        const response = await api.get(`${baseUrl}/${id}`);
        return response.data.data;
    }

    public async postPreferenceVersion(version : string, Date: Date) {
        
        
        const response = await api.post(`${baseUrl}/`, {
            version: version,
            date: Date
        });
        return response.data;
    }


}