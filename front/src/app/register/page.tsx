"use client"

import React, { useState } from 'react';
import Title from '@/components/Title';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Button from '@/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import SignInForm from '@/types/SignInForm';
import apiService from '@/services/userServices';

type userData = {
    email: string,
    password: string,
    name: string
};

const Register = () => {
    const { handleSubmit, control, formState: { errors }, watch } = useForm<SignInForm>();
    const [userData, setUserData] = useState<userData>();
    
    const handleFormSubmit: SubmitHandler<SignInForm> = (data) => {
        setUserData({ name: data.name, email: data.email, password: data.password });
        const res = apiService.postData("register", data);
        console.log(res);
    };

    return (
        <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,0 100,0 0,100" className="fill-white" />
                <polygon points="100,0 100,100 0,100" className="fill-indigo-700" />
            </svg>
            <div className="relative z-10 p-8 bg-white rounded-lg shadow-lg">
                <Title>Register</Title>
                <form className="md:space-y-4" onSubmit={handleSubmit(handleFormSubmit)} action="">
                    <div className="space-y-0.5 md:space-y-1">
                        <Label>Nome:</Label>
                        <Input defaultValue="" placeHolder="Seu nome" control={control} name="name" rules={{ required: "Nome inválido", minLength: 3 }} />
                        {errors.name && errors.name.type === "required" && (
                            <span className='text-red-500 text-sm' role="alert">{errors.name.message}</span>
                        )}
                        {errors.name && errors.name.type === "minLength" && (
                            <span className='text-red-500 text-sm' role="alert">Tamanho inválido</span>
                        )}
                    </div>
                    <div className="space-y-2 md:space-y-1">
                        <Label>Email:</Label>
                        <Input defaultValue='' placeHolder="name@company.com" control={control} name="email" rules={{ required: "Email inválido" }} />
                        {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
                    </div>
                    <div className="space-y-2 md:space-y-1">
                        <Label>Senha:</Label>
                        <Input defaultValue='' placeHolder="••••••••" control={control} name="password" rules={{ required: "Senha inválida", minLength: 8 }} />
                        {errors.password && errors.password.type === "required" && (
                            <span className='text-red-500 text-sm' role="alert">{errors.password.message}</span>
                        )}
                        {errors.password && errors.password.type === "minLength" && (
                            <span className='text-red-500 text-sm' role="alert">Tamanho inválido</span>
                        )}
                    </div>
                    <div className="space-y-2 md:space-y-1">
                        <Label>Confirmar senha:</Label>
                        <Input defaultValue='' placeHolder="••••••••" control={control} name="confirmation" rules={{ required: "Senha inválida", minLength: 8, validate: (val: string) => {
                            if (watch('password') != val) {
                                return "As senhas não coincidem";
                              }
                        }}} />
                        {errors.confirmation && errors.confirmation.type === "required" && (
                            <span className='text-red-500 text-sm' role="alert">{errors.confirmation.message}</span>
                        )}
                        {errors.confirmation && errors.confirmation.type === "minLength" && (
                            <span className='text-red-500 text-sm' role="alert">Tamanho inválido</span>
                        )}
                        {errors.confirmation && errors.confirmation.type === "validate" && (
                            <span className='text-red-500 text-sm' role="alert">{errors.confirmation.message}</span>
                        )}
                    </div>
                    <Button>Entrar</Button>
                </form>
            </div>
        </div>
    );
};

export default Register;
