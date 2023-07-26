import axios from "axios";
import { RegisterCredentials } from "../register/page";
import { LoginCredentials } from "../login/page";
const API_URL = "http://localhost:5050/user";

export const getUser = async () => {
    const response = await axios.get(`${API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return response.data;
};

export const registerUser = async ({
    email,
    password,
    confirmPassword,
}: RegisterCredentials) => {
    const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        confirmPassword,
    });

    localStorage.setItem("token", response.data.token);
};

export const loginUser = async ({ email, password }: LoginCredentials) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
    });

    localStorage.setItem("token", response.data.token);
};

export const getVerificationCode = async (email: string) => {
    const response = await axios.post(`${API_URL}/code`, { email });

    return response.data;
};

type changePassType = {
    oldPassword: string;
    newPassword: string;
};

export const changePassword = async (data: changePassType) => {
    const response = await axios.post(`${API_URL}/change/password`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

type verifyUserType = {
    email: string;
    password: string;
};

export const verifyUser = async (data: verifyUserType) => {
    const response = await axios.post(`${API_URL}/verify`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    console.log(response.data);
};
