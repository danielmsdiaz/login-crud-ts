import React, { useEffect, useRef, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PersonalProfileForm } from '@/types/ProfileForm';
import Dropdown from './Dropdown';
import fetchAddressByCep from '@/services/other/viaCEP';
import { stat } from 'fs';

type PersonalProfileProps = {
    handleFormSubmit: SubmitHandler<PersonalProfileForm>;
    name: string,
    email: string
}

const PersonalProfile = ({ handleFormSubmit, name, email }: PersonalProfileProps) => {
    const { handleSubmit, setValue, trigger, control, formState: { errors }, watch, register, setError } = useForm<PersonalProfileForm>();
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
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="space-y-7">
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
                                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder=""
                                        autoComplete="username"
                                        {...register("username", {
                                            required: "Nome de usuário é obrigatório",
                                            minLength: {
                                                value: 3,
                                                message: "Nome de usuário deve ter pelo menos 3 caracteres"
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: "Nome de usuário deve ter no máximo 20 caracteres"
                                            }
                                        })}
                                        className="ml-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.username && (
                                    <span className="text-red-500 text-sm">{errors.username.message}</span>
                                )}
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
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use um endereço permanente onde você possa receber correspondências.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nome
                                </label>
                                <input
                                    id="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    readOnly={true}
                                    {...register("name", { required: "Nome é obrigatório" })}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Sobrenome
                                </label>
                                <input
                                    id="last-name"
                                    type="text"
                                    autoComplete="family-name"
                                    {...register("lastName", {
                                        required: "Sobrenome é obrigatório",
                                        minLength: {
                                            value: 2,
                                            message: "Sobrenome deve ter pelo menos 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Sobrenome deve ter no máximo 30 caracteres"
                                        }
                                    })}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.lastName && (
                                    <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                                )}
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    readOnly={true}
                                    {...register("email", {
                                        required: "Email é obrigatório",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Email inválido"
                                        }
                                    })}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                                )}
                            </div>

                            <div className="sm:col-span-3">
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
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.zipCode && (
                                    <span className="text-red-500 text-sm">{errors.zipCode.message}</span>
                                )}
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                    Logradouro
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="street"
                                        type="text"
                                        value={street}
                                        readOnly={true}
                                        autoComplete="street"
                                        {...register("street", {required: "Logradouro é obrigatório"})}
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* <div className="sm:col-span-3">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                    Telefone
                                </label>
                                <input
                                    id="phone"
                                    type="text"
                                    autoComplete="tel"
                                    {...register("phone", {
                                        required: "Telefone é obrigatório",
                                        pattern: {
                                            value: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                                            message: "Telefone inválido"
                                        }
                                    })}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-sm">{errors.phone.message}</span>
                                )}
                            </div> */}

                            <div className="sm:col-span-3">
                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                    Estado
                                </label>
                                <input
                                    id="state"
                                    type="text"
                                    autoComplete="address-level1"
                                    value={state}
                                    readOnly={true}
                                    {...register("state", { required: "Estado é obrigatório" })}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.state && (
                                    <span className="text-red-500 text-sm">{errors.state.message}</span>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cidade
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    autoComplete="address-level2"
                                    value={city}
                                    readOnly={true}
                                    {...register("city", { required: "Cidade é obrigatória" })}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.city && (
                                    <span className="text-red-500 text-sm">{errors.city.message}</span>
                                )}
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    País
                                </label>
                                <input
                                    id="country"
                                    type="text"
                                    autoComplete="country-name"
                                    value={"Brasil"}
                                    readOnly={true}
                                    {...register("country", { required: "País é obrigatório" })}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.country && (
                                    <span className="text-red-500 text-sm">{errors.country.message}</span>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Preço por hora
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    min="1"
                                    max="1000"
                                    step="0.01"
                                    {...register("price", {
                                        required: "Preço é obrigatório",
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: "Preço deve ser no mínimo R$ 1,00"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "Preço deve ser no máximo R$ 1000,00"
                                        }
                                    })}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.price && (
                                    <span className="text-red-500 text-sm">{errors.price.message}</span>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cargo/Posição
                                </label>
                                <input
                                    id="role"
                                    type="text"
                                    {...register("role", {
                                        required: "Cargo/Posição é obrigatório",
                                        maxLength: {
                                            value: 50,
                                            message: "Cargo/Posição deve ter no máximo 50 caracteres"
                                        }
                                    })}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.role && (
                                    <span className="text-red-500 text-sm">{errors.role.message}</span>
                                )}
                            </div>

                            <div className="sm:col-span-4">
                                <Dropdown setValue={setValue} trigger={trigger} register={register} errors={errors} />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
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
                </div>
            </form>
        </div>
    );
}

export default PersonalProfile;
