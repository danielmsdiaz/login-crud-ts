'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import WorkoutType from '@/types/Workout'

type OverviewProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    workout: WorkoutType;
};

export default function Overview({ workout, open, setOpen }: OverviewProps) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
            />

            <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-lg bg-white rounded-lg shadow-xl"
                >
                    <div className="relative p-6">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900">{workout.title}</h2>

                        <hr className="my-2 border-gray-200" />
                        <section aria-labelledby="information-heading" className="mt-4">
                            <h3 id="information-heading" className="sr-only">
                                Workout information
                            </h3>

                            <p className="text-lg text-gray-700">{workout.description}</p>
                            <p className="mt-2 text-base text-gray-900">Duração: {workout.duration}</p>
                            <p className="mt-1 text-base text-gray-900">Nível: {workout.level}</p>
                        </section>

                        <section aria-labelledby="exercises-heading" className="mt-4">
                            <h3 id="exercises-heading" className="text-base font-medium text-gray-900">Exercícios</h3>

                            <ul className="mt-2 space-y-2">
                                {workout.exercises.map((exercise, index) => (
                                    <li key={index} className="flex justify-between text-sm text-gray-900">
                                        <span>{exercise.name}</span>
                                        <span>{exercise.sets}x{exercise.reps} reps</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <hr className="my-4 border-gray-200" />

                        <div className="flex justify-center space-x-4">
                            <button
                                type="button"
                                className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
