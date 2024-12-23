import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import apiService from '@/services/contractServices';
import ContractType from '@/types/Contract';

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

type ListProps = {
    personais: Personal[];
    loggedUser: number;
};

const List = (props: ListProps) => {
    const [currentPersonal, setCurrentPersonal] = useState<Personal | null>(null);
    const [userContracts, setUserContracts] = useState<ContractType[]>();
    const [hasPendingContracts, setHasPendingContracts] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        apiService.getContracts("get", props.loggedUser).then((res) => {
            setUserContracts(res);
        });
    }, [refresh])

    useEffect(() => {
        if(userContracts?.length){
            setHasPendingContracts(true);
        }
    }, [userContracts])

    const toggleModal = (personal: Personal | null) => {
        setCurrentPersonal(personal);
    };

    const cancelSolicitation = () => {
        alert("sda")
    }

    return (
        <>
            <main>
                <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
                    <ul role="list" className="divide-y divide-gray-100">
                        {props.personais.map((person) => (
                            <li key={person.email} className="flex flex-col sm:flex-row justify-between gap-6 py-4">
                                <div className="flex min-w-0 gap-x-4">
                                    <img
                                        alt=""
                                        src={person.imageUrl}
                                        className="h-16 w-16 flex-none rounded-full bg-gray-50"
                                    />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                        <p className="mt-1 text-xs leading-5 text-gray-500">{person.email}</p>
                                        <p className="mt-1 text-xs leading-5 text-gray-500">{person.location}</p>
                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            {person.specializations.join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-none flex flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">Avaliação: {person.reviews}</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">Preço: {person.price}</p>
                                    {userContracts && userContracts.filter(contract => contract.personalId === person.id).length > 0 ? (
                                        <button
                                            onClick={cancelSolicitation}
                                            className="mt-2 text-xs font-semibold text-red-700 hover:underline"
                                        >
                                            Cancelar solicitação
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => toggleModal(person)}
                                            className="mt-2 text-xs font-semibold text-indigo-700 hover:underline"
                                        >
                                            Detalhes
                                        </button>
                                    )}

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            {currentPersonal && (
                <Modal setRefresh={setRefresh} hasPendingContracts={hasPendingContracts} loggedUser={props.loggedUser} personal={currentPersonal} toggleModal={() => toggleModal(null)} />
            )}
        </>
    );
};

export default List;
