import apiService from '@/services/contractServices';
import React, { useEffect, useRef, useState } from 'react';
import { getUserId } from '@/helpers/jwtUtils';

type ContractModalProps = {
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    alunoId: number;
    refresh: React.Dispatch<React.SetStateAction<boolean>>
    activeContract: { id: number, status: boolean } | null;
};

const ContractModal = ({ toggleModal, alunoId, refresh, activeContract }: ContractModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleRefuseContract = async () => {
        const personalId = getUserId();
        const data = { personalId: personalId as number, loggedUserId: alunoId, id: activeContract?.id, status: activeContract?.status }

        try {
            const response = await apiService.deleteContract("delete", data);

            if (!response) {
                return alert("Erro ao cancelar o contrato")
            }

            alert("Contrato cancelado com sucesso")
            setIsVisible(false);
            setTimeout(() => {
                toggleModal(false);
            }, 300);
            refresh((prev) => (!prev));
        }
        catch (er) {
            console.log(er);
        }
    }

    const handleAcceptContract = async () => {
        const personalId = getUserId();
        const data = { personalId: personalId as number, loggedUserId: alunoId, id: activeContract?.id }

        try {
            const response = await apiService.putContract("put", data);

            if (!response) {
                return alert("Erro ao aceitar o contrato")
            }

            alert("Contrato aceito com sucesso")
            setIsVisible(false);
            setTimeout(() => {
                toggleModal(false);
            }, 300);
            refresh((prev) => (!prev));
        }
        catch (er) {
            console.log(er);
        }
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setIsVisible(false);
            setTimeout(() => {
                toggleModal(false);
            }, 300);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Overlay com animação */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0 pointer-events-none'
                    }`}
            ></div>

            {/* Modal com animação */}
            <div
                id="default-modal"
                tabIndex={-1}
                aria-hidden={true}
                aria-modal={true}
                className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
            >
                <div
                    ref={modalRef}
                    className="relative p-4 w-full max-w-md max-h-full"
                >
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex flex-col items-center p-6">
                            <img
                                alt={"personal.name"}
                                src={"personal.imageUrl"}
                                className="modal-img h-24 w-24 rounded-full bg-gray-50 mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-indigo-700 dark:text-white">
                                {"personal.name"}
                            </h3>
                            <p className="text-lg text-gray-500 dark:text-gray-400">{"personal.role"}</p>
                        </div>
                        {/* Modal body */}
                        <div className="px-6 py-4 space-y-2 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Email:</strong> {"personal.email"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Localização:</strong> {"personal.location"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Especializações:</strong> {"personal.specializations.join(', ')"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Avaliações:</strong> {"personal.reviews"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Preço:</strong> {"personal.price"}
                            </p>
                        </div>
                        {!activeContract?.status ? (
                            <div className="flex items-center justify-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600 space-x-4">
                                <button
                                    type="button"
                                    className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                                    onClick={handleRefuseContract}
                                >
                                    Recusar
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                    onClick={handleAcceptContract}
                                >
                                    Aceitar
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600 space-x-4">
                                <button
                                    type="button"
                                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                                    onClick={handleRefuseContract}
                                >
                                    Finalizar Contrato
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContractModal;
