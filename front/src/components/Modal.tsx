import React, { useEffect } from 'react';
import apiService from '@/services/contractServices';

type Personal = {
    id: number;
    name: string;
    email: string;
    role: string;
    imageUrl: string;
    specializations: string[];
    reviews: number;
    price: string;
    location?: string;
};

type ModalProps = {
    personal: Personal;
    toggleModal: () => void;
    loggedUser: number;
    hasPendingContracts: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({setRefresh, hasPendingContracts, personal, toggleModal, loggedUser }: ModalProps) => {

    const handleModalSubmit = () => {
        if (hasPendingContracts) {
            alert("Você já possui um contrato!");
            return toggleModal();
        }
    
        const data = { loggedUserId: loggedUser, personalId: personal.id };
        apiService.postContract("create", data)
            .then((res) => {
                if (res) {
                    alert("Sua solicitação de contrato foi enviada!");
                }
            })
            .finally(() => {
                setRefresh(true);
                toggleModal();
            });
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleModal}></div>

            {/* Main modal */}
            <div
                id="default-modal"
                tabIndex={-1}
                aria-hidden={true}
                aria-modal={true}
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex flex-col items-center p-6">
                            <img
                                alt={personal.name}
                                src={personal.imageUrl}
                                className="modal-img h-24 w-24 rounded-full bg-gray-50 mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-indigo-700 dark:text-white">
                                {personal.name}
                            </h3>
                            <p className="text-lg text-gray-500 dark:text-gray-400">{personal.role}</p>
                        </div>
                        {/* Modal body */}
                        <div className="px-6 py-4 space-y-2 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Email:</strong> {personal.email}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Localização:</strong> {personal.location}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Especializações:</strong> {personal.specializations.join(', ')}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Avaliações:</strong> {personal.reviews}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Preço:</strong> {personal.price}
                            </p>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center justify-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600 space-x-4">
                            <button
                                type="button"
                                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                                onClick={toggleModal}
                            >
                                Fechar
                            </button>
                            <button
                                type="button"
                                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                onClick={handleModalSubmit}
                            >
                                Contratar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
