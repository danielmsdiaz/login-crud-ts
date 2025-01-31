import React, { useEffect, useState } from 'react';
import apiService from '@/services/personalServices';
import { getUserId } from '@/helpers/jwtUtils';
import WorkoutType from '@/types/Workout';

type ModalProps = {
    toggleModal: () => void;
    fetchWorkouts: () => void;
    isEdit?: boolean
    workout?: WorkoutType
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkoutModal = ({ fetchWorkouts, toggleModal, isEdit = false, workout = undefined, setOpen}: ModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [exercises, setExercises] = useState([{ name: '', reps: '' }]);

    useEffect(() => {
        if (workout) {
            setTitle(workout.title || '');
            setDescription(workout.description || '');
            setExercises(workout.exercises || [{ name: '', reps: '' }]);
        }
    }, [workout]);

    const handleAddExercise = () => {
        setExercises([...exercises, { name: '', reps: '' }]);
    };

    const handleRemoveExercise = (index: number) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const handleExerciseChange = (index: number, field: string, value: string) => {
        const newExercises = exercises.map((exercise, i) =>
            i === index ? { ...exercise, [field]: value } : exercise
        );
        setExercises(newExercises);
    };

    const handleSubmit = () => {
        const personalId = getUserId();
        const data = { title, description, exercises, personalId };
        apiService.postWorkout("workout", data).then((res) => {
            if (res) {
                fetchWorkouts();
            }
        });
        toggleModal();
    };

    const handleEdit = () => {
        const data = { title, description, exercises};
        apiService.editWorkout("workout", workout?.id as number, data).then((res) => {
            if (res) {
                fetchWorkouts();
            }
        });
        toggleModal();
        if(setOpen){
            setOpen(false);
        }
    };
    

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleModal}></div>

            {/* Main modal */}
            <div
                id="create-workout-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex justify-between items-center p-4 border-b rounded-t dark:border-gray-600">
                            {isEdit ? (
                                <h3 className="text-xl font-semibold text-indigo-700 dark:text-white">
                                    Editar treino
                                </h3>
                            ) : (
                                <h3 className="text-xl font-semibold text-indigo-700 dark:text-white">
                                    Novo Treino
                                </h3>
                            )}
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={toggleModal}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Título do Treino
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Descrição (Opcional)
                                </label>
                                <textarea
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Exercícios
                                </label>
                                <div className="space-y-2">
                                    {exercises.map((exercise, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                placeholder="Nome do exercício"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
                                                value={exercise.name}
                                                onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Repetições"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
                                                value={exercise.reps}
                                                onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleRemoveExercise(index)}
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 4a1 1 0 00-1 1v1H4a1 1 0 00-1 1v1a1 1 0 001 1h1v1a1 1 0 001 1h4a1 1 0 001-1v-1h1a1 1 0 001-1V7a1 1 0 00-1-1h-1V5a1 1 0 00-1-1H6zM4 7v6h12V7H4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            className="mt-2 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                            onClick={handleAddExercise}
                                        >
                                            Adicionar Exercício
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center justify-center p-6 space-x-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                type="button"
                                className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600"
                                onClick={toggleModal}
                            >
                                Cancelar
                            </button>
                            {isEdit ? (
                                <button
                                    type="button"
                                    className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                    onClick={handleEdit}
                                >
                                    Editar Treino
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                    onClick={handleSubmit}
                                >
                                    Criar Treino
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkoutModal;
