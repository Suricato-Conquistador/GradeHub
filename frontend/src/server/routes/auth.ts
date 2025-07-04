import { api } from "../api";

const baseUrl = "/auth";

export default class Auth {
    public async login(email: string, password: string) {
        const response = await api.post(`${baseUrl}/login`, {
            email: email,
            password: password
        });
        // console.log(response.data.status);
        return response.data;
    };

    public async signUp(userType: string, name: string, email: string, password: string, confirmPassword: string) {
        const response = await api.post(`${baseUrl}/signup`, {
            userType: userType,
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
        return response.data;
    };
};
