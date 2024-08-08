import { jwtDecode } from "jwt-decode";

export const decode = (token: string) => {
    return jwtDecode(token);
}