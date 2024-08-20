"use client"

import React from 'react'

const RegisterWarning = () => {

    return (
        <>
            <div className="relative isolate px-6 py-16 sm:py-24 lg:py-32">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Finalize seu cadastro para ter acesso <br /> às nossas funcionalidades exclusivas
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Complete seu cadastro para começar a criar treinos e aproveitar todas as vantagens que oferecemos para transformar a jornada dos seus alunos.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            type='button'
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            href='profile'
                        >
                            Finalizar Cadastro
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterWarning
