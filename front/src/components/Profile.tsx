import React, { useEffect, useRef, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { GymMemberProfileForm } from '@/types/ProfileForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import fetchAddressByCep from '@/services/other/viaCEP';

type ProfileProps = {
    handleFormSubmit: SubmitHandler<GymMemberProfileForm>;
    name: string;
    email: string;
};

const GymMemberProfile = ({ handleFormSubmit, name, email }: ProfileProps) => {
    const { register, handleSubmit, formState: { errors }, setValue, trigger, setError } = useForm<GymMemberProfileForm>();

    const inputFile = useRef<HTMLInputElement | null>(null);
    const [avatarURL, setAvatarURL] = useState<string>();
    const [street, setStreet] = useState<string>();
    const [city, setCity] = useState<string>();
    const [state, setState] = useState<string>();

    useEffect(() => {
        setValue("name", name);
        setValue("email", email);
        setValue("city", city as string);
        setValue("state", state as string);
        setValue("street", street as string);
    }, [name, email, street, city, state, setValue]);

    const openFileButton = () => {
        if (inputFile.current && inputFile.current.files) {
            inputFile.current.click();
        }
    };

    const uploadImageDisplay = async () => {
        if (inputFile.current && inputFile.current.files) {
            const uploadedFile = inputFile.current.files[0];
            const cachedURL = URL.createObjectURL(uploadedFile);
            setAvatarURL(cachedURL);
            setValue("img", cachedURL);
            await trigger("img");
        }
    }

    const handleCepApi = async (event: any) => {
        const cep = event.target.value;
        await fetchAddressByCep(cep).then((res) => {
            if (res.erro) {
                setError("zipCode", {
                    type: "manual",
                    message: "CEP não encontrado",
                });
                setStreet("");
                setCity("");
                setState("");
            }
            else {
                setStreet(res.logradouro);
                setCity(res.localidade);
                setState(res.uf);
                trigger("zipCode")
            }
        })
    }

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Meu perfil</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Essas informações serão exibidas publicamente, portanto, tenha cuidado com o que você compartilha.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        Nome de usuário
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="username"
                                                {...register('username', { required: 'Nome de usuário é obrigatório' })}
                                                type="text"
                                                placeholder="janesmith"
                                                autoComplete="username"
                                                className="pl-2 block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.username && (
                                            <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Foto de Perfil
                                    </label>
                                    <div className="mt-5 flex items-center gap-x-3">
                                        {avatarURL ? (
                                            <img
                                                src={avatarURL}
                                                alt="Avatar"
                                                className="h-15 w-20 rounded-full" />) :
                                            (
                                                <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                            )}
                                        <input {...register("img", { required: "Foto de perfil é obrigatória" })} onChange={uploadImageDisplay} accept='.png, .jpg, .jpeg' className="hidden" type='file' id='file' ref={inputFile} />
                                        <button
                                            type="button"
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            onClick={openFileButton}
                                        >
                                            Mudar
                                        </button>
                                    </div>
                                    {errors.img && (
                                        <span className="text-red-500 text-sm">{errors.img.message}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Informações Pessoais</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use um endereço permanente onde você possa receber correspondências.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Nome
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="first-name"
                                            {...register('name', { required: 'Nome é obrigatório' })}
                                            type="text"
                                            autoComplete="given-name"
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Sobrenome
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="last-name"
                                            {...register('lastName', { required: 'Sobrenome é obrigatório' })}
                                            type="text"
                                            autoComplete="family-name"
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.lastName && (
                                            <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            {...register('email', {
                                                required: 'Email é obrigatório',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                    message: 'Endereço de email inválido'
                                                }
                                            })}
                                            type="email"
                                            autoComplete="email"
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="cep" className="block text-sm font-medium leading-6 text-gray-900">
                                        CEP
                                    </label>
                                    <input
                                        id="cep"
                                        type="text"
                                        autoComplete="postal-code"
                                        {...register("zipCode", {
                                            required: "CEP é obrigatório",
                                            pattern: {
                                                value: /^[0-9]{5}-?[0-9]{3}$/,
                                                message: "CEP inválido"
                                            }
                                        })}
                                        onBlur={(e) => { handleCepApi(e) }}
                                        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                        maxLength={8}
                                        className="pl-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.zipCode && (
                                        <span className="text-red-500 text-sm">{errors.zipCode.message}</span>
                                    )}
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Logradouro
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="street-address"
                                            {...register('street', { required: 'Logradouro é obrigatório' })}
                                            type="text"
                                            autoComplete="street-address"
                                            readOnly={true}
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.street && (
                                            <p className="text-sm text-red-600 mt-1">{errors.street.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cidade
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="city"
                                            {...register('city', { required: 'Cidade é obrigatória' })}
                                            type="text"
                                            autoComplete="address-level2"
                                            readOnly={true}
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.city && (
                                            <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                        Estado
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="state"
                                            {...register('state', { required: 'Estado é obrigatório' })}
                                            type="text"
                                            autoComplete="address-level1"
                                            readOnly={true}
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.state && (
                                            <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        País
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="country"
                                            {...register('country', { required: 'País é obrigatório' })}
                                            type="text"
                                            autoComplete="country"
                                            value={"Brasil"}
                                            readOnly={true}
                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.country && (
                                            <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default GymMemberProfile;
