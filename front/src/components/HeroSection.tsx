"use client"

import React, { useState } from 'react'
import WorkoutModal from './WorkoutModal';

type HeroSectionProps = {
    fetchWorkouts: () => void
}

const HeroSection = ({fetchWorkouts}: HeroSectionProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const toggleModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <>
            <div className="relative isolate px-6 py-16 sm:py-24 lg:py-32">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Comece a transformar vidas com <br /> seu conhecimento
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Você ainda não criou nenhum treino. Este é o momento de começar a planejar sessões que vão transformar a jornada dos seus alunos.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            type='button'
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={toggleModal}
                        >
                            Criar um treino
                        </button>
                    </div>
                </div>
            </div>
            {openModal && (
                <WorkoutModal fetchWorkouts={fetchWorkouts} toggleModal={toggleModal} />
            )}
        </>
    )
}

export default HeroSection