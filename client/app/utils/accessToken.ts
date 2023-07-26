import jwtDecode from "jwt-decode";

type tokenType = {
    exp: number;
    iat: number;
    _id: string;
};

export const checkTokenStatus = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }

    try {
        const decodedToken: tokenType = jwtDecode(token);
        const expiresIn = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime > expiresIn) {
            console.log("Token expired");
            localStorage.removeItem("token");
            return false;
        }

        return true;
    } catch (error) {
        console.log("token error");
        localStorage.removeItem("token");
        return false;
    }
};
