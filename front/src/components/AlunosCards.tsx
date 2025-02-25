import React, { useEffect, useState } from 'react'
import { getUserId } from '@/helpers/jwtUtils';
import apiService from '@/services/contractServices'

const AlunosCards = () => {
    const [contracts, setContracts] = useState<any[]>();
    const [refresh, setRefresh] = useState<boolean>(false);

    const fetchAlunos = async () => {
        try {
            const personalId = getUserId();
            const data = await apiService.getActiveContracts("get", 1, personalId as number);

            if (Array.isArray(data)) {
                setContracts(data);
            } else {
                console.error("Dados inesperados:", data);
            }
        } catch (error) {
            console.error("Erro ao buscar contratos:", error);
        } finally {
            //setLoading(false);
        }
    };

    const handleCancelContract = async (contract: any) => {
        const personalId = getUserId();
        const data = { personalId: personalId as number, loggedUserId: contract.alunoId, id: contract.id, status: contract.status }

        try {
            const response = await apiService.deleteContract("delete", data);

            if (!response) {
                return alert("Erro ao cancelar o contrato")
            }

            alert("Contrato cancelado com sucesso")
            setRefresh((prev) => (!prev));
        }
        catch (er) {
            console.log(er);
        }
    }

    useEffect(() => {
        fetchAlunos();
    }, [refresh]);

    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Meus Alunos</h5>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {contracts?.length ? (
                        contracts.map((contract, index) => (
                            <li key={index} className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="shrink-0"></div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {`${contract.aluno.name} ${contract.aluno.lastName}`}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {contract.aluno.email}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <button onClick={() => handleCancelContract(contract)} className="bg-indigo-700 text-white rounded-lg p-1 text-[12px] hover:bg-indigo-700/90">
                                            Finalizar Contrato
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="py-3 sm:py-4 text-sm text-gray-500 dark:text-gray-400">
                            Nenhum aluno disponível.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default AlunosCards