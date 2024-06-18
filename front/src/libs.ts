
import Cookies from 'js-cookie';
import { NextRequest, NextResponse } from 'next/server';

export const login = (token: string) => {
    const expires = new Date(Date.now() + 5 * 60 * 1000); // Definir o tempo de expiração para 10 minutos
    Cookies.set('session', token, {expires})
}

export const logout = () => {
    Cookies.remove('session');
}

export const updateSession = (request: NextRequest) => {
    console.log("testsae");
}
