"use client"

import Header from '@/components/Header'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decode } from '@/helpers/jwtUtils';
import GymMemberProfile from '@/components/Profile';
import PersonalProfile from '@/components/PersonalProfile';
import { PersonalProfileForm, GymMemberProfileForm } from '@/types/ProfileForm';
import { SubmitHandler } from 'react-hook-form';
import apiService from '@/services/userServices';

export default function Profile() {

    const [id, setId] = useState<number>();
    const [type, setType] = useState<number>();
    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();

    const router = useRouter();

    const handleFormSubmit: SubmitHandler<PersonalProfileForm | GymMemberProfileForm> = async (data) => {
        const res = apiService.updateProfile("users", id as number, type as number, data);
        alert("Perfil atualizado com sucesso!")
        router.push("/dashboard");
    };

    useEffect(() => {
        const sessionCookie = Cookies.get("session");

        if (!sessionCookie) {
            router.push("/");
            return;
        }

        try {
            //@ts-ignore
            const id = decode(sessionCookie).id;
            //@ts-ignore
            const type = decode(sessionCookie).type;
            //@ts-ignore
            const name = decode(sessionCookie).name;
            //@ts-ignore
            const email = decode(sessionCookie).email;
            setId(id);
            setType(type);
            setName(name);
            setEmail(email);
        } catch (error) {
            console.error("Failed to decode token:", error);
            router.push("/"); // Redirecionar em caso de erro
        }

    }, []);

    return (
        <>
            <div className="min-h-full">
                <Header />
                <main>
                    {type == 0 ? (
                        <GymMemberProfile name={name as string} email={email as string} handleFormSubmit={handleFormSubmit}/>
                    ) : (
                        <PersonalProfile name={name as string} email={email as string} handleFormSubmit={handleFormSubmit} />
                    )}
                </main>
            </div>
        </>
    )
}
