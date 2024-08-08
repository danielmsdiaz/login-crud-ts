"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Title from '@/components/Title';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Button from '@/components/Button';
import Radio from '@/components/Radio';
import { useRouter } from 'next/navigation';
import apiService from '@/services/userServices';
import SignInForm from '@/types/SignInForm';

const Register = () => {
  const router = useRouter();
  const { handleSubmit, control, formState: { errors }, watch } = useForm<SignInForm>();

  const handleFormSubmit: SubmitHandler<SignInForm> = async (data) => {
    console.log(data);
    const userType = parseInt(data.userType);
    
    const userData = {
        ...data,
        userType,
    };
    
    const res = await apiService.postData("register", userData);
    if (res.User.status) {
      alert("Usuário criado com sucesso");
      router.push("/");
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,0 100,0 0,100" className="fill-white" />
        <polygon points="100,0 100,100 0,100" className="fill-indigo-700" />
      </svg>
      <div className="relative z-10 p-8 bg-white rounded-lg shadow-lg">
        <Title>Register</Title>
        <form className="md:space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-0.5 md:space-y-1">
            <Label>Nome:</Label>
            <Input placeHolder="Seu nome" control={control} name="name" rules={{ required: "Nome inválido", minLength: 3 }} />
            {errors.name && errors.name.type === "required" && (
              <span className='text-red-500 text-sm' role="alert">{errors.name.message}</span>
            )}
            {errors.name && errors.name.type === "minLength" && (
              <span className='text-red-500 text-sm' role="alert">Tamanho inválido</span>
            )}
          </div>
          <div className="space-y-2 md:space-y-1">
            <Label>Email:</Label>
            <Input placeHolder="name@company.com" control={control} name="email" rules={{ required: "Email inválido" }} />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
          </div>
          <div className="space-y-2 md:space-y-1">
            <Label>Tipo de usuário:</Label>
            <Radio
              name="userType" // Certifique-se de que o nome corresponde ao campo no tipo SignInForm
              control={control}
              options={[
                { value: '0', label: 'Aluno' },
                { value: '1', label: 'Personal' }
              ]}
              rules={{ required: "Escolha um tipo" }}
            />
            {errors.userType && <span className='text-red-500 text-sm'>{errors.userType.message}</span>}
          </div>
          <div className="space-y-2 md:space-y-1">
            <Label>Senha:</Label>
            <Input placeHolder="••••••••" control={control} name="password" rules={{ required: "Senha inválida", minLength: 8 }} />
            {errors.password && errors.password.type === "required" && (
              <span className='text-red-500 text-sm' role="alert">{errors.password.message}</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className='text-red-500 text-sm' role="alert">Tamanho inválido</span>
            )}
          </div>
          <div className="space-y-2 md:space-y-1">
            <Label>Confirmar senha:</Label>
            <Input placeHolder="••••••••" control={control} name="confirmation" rules={{ required: "Senha inválida", minLength: 8, validate: (val: string) => watch('password') === val || "As senhas não coincidem" }} />
            {errors.confirmation && <span className='text-red-500 text-sm'>{errors.confirmation.message}</span>}
          </div>
          <Button>Entrar</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
