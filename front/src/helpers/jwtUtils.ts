import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export const decode = (token: string) => {
    return jwtDecode(token);
}

export const getUserId = (): number | null => {
    try {
        const token = Cookies.get("session");

        if (!token) {
            console.error("Token não encontrado");
            return null;
        }

        const decodedToken = jwtDecode<{ id: string }>(token);
        return parseInt(decodedToken.id);
    } catch (error) {
        console.error("Erro ao decodificar o token", error);
        return null;
    }
}
