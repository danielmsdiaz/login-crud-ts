'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import WorkoutType from '@/types/Workout'
import apiService from '@/services/personalServices'
import { useState } from 'react'
import WorkoutModal from './WorkoutModal'

type OverviewProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    workout: WorkoutType;
    fetchWorkouts: () => void;
    personalId: number;
};

export default function Overview({ fetchWorkouts, workout, open, setOpen, personalId }: OverviewProps) {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const deleteWorkout = async () => {
        await apiService.deleteWorkout("workout", workout.id as number).then((res) => {
            if (res) {
                setOpen(false);
                fetchWorkouts();
            }
        });
    };

    const toggleModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <>
            {!openModal && (
                <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"
                    />
                    <div className="fixed inset-0 z-10 flex items-center justify-center p-6">
                        <DialogPanel
                            transition
                            className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8"
                        >
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                                <h2 className="text-3xl font-semibold text-gray-900 mb-4 capitalize">{workout.title}</h2>
                                <hr className="my-4 border-gray-200" />
                                <section aria-labelledby="information-heading" className="mt-6">
                                    <h3 id="information-heading" className="sr-only">Workout information</h3>
                                    <div className='flex items-center gap-x-2'>
                                        <p className="text-lg font-medium text-gray-900">Descrição:</p>
                                        <p className='text-sm text-gray-700 capitalize'>{workout.description}</p>
                                    </div>
                                </section>
                                <section aria-labelledby="exercises-heading" className="mt-6">
                                    <h3 id="exercises-heading" className="text-lg font-semibold text-gray-900">Exercícios</h3>
                                    <ul className="mt-4 space-y-3">
                                        {workout.exercises.map((exercise, index) => (
                                            <li key={index} className="flex justify-between text-sm text-gray-900">
                                                <span>{exercise.name}</span>
                                                <span>{exercise.reps} reps</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                <hr className="my-6 border-gray-200" />
                                <div className="flex justify-center space-x-6">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={toggleModal}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-5 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        onClick={deleteWorkout}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
            {openModal && (
                <WorkoutModal personalId={personalId} setOpen={setOpen} workout={workout} isEdit={true} fetchWorkouts={fetchWorkouts} toggleModal={toggleModal} />
            )}
        </>
    );
}
