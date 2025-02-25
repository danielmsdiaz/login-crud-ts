"use client"

import Header from '@/components/Header'
import Card from '@/components/Card'
import PersonalCard from '@/components/PersonalCard'
import CalendarComponent from '@/components/Calendar'
import { getUserId } from '@/helpers/jwtUtils'
import apiService from '@/services/contractServices'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader';

export default function Dashboard() {
  const [contract, setContract] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchAlunos = async () => {
    try {
      const alunoId = getUserId();
      const data = await apiService.getActiveContracts("get", 0, alunoId as number);

      if (data) {
        setContract(data);
      } else {
        console.error("Dados inesperados:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelContract = async () => {
    const data = { personalId: contract.personalId as number, loggedUserId: contract.alunoId, id: contract.id, status: contract.status }

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
  }, [refresh])

  return (
    <>
      <div className="min-h-full">
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center md:text-left">Meus treinos</h1>
            </div>
            <main>
              <div className="mx-auto max-w-7xl px-4 xl:py-6 sm:px-6 lg:px-8 pb-5">
                <div className="md:grid md:grid-cols-[1fr_2fr] items-start gap-x-6">
                  <div className='flex flex-col items-center md:items-start'>
                    <PersonalCard contract={contract} />
                    {contract?.personal?.name && (
                      <button
                        onClick={handleCancelContract}
                        className="bg-indigo-700 text-white w-[343px] md:w-[384px] rounded-lg py-3 mt-4 hover:bg-indigo-700/90"
                      >
                        Finalizar Contrato
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-4 mt-4 md:mt-0">
                    <div className="flex gap-x-4">
                      <Card className='flex-1' status='finished' title="Treinos Finalizados" subtitle="20" description="Treinos finalizados nos ultimos 30 dias" />
                      <Card className='flex-1' status='lost' title="Treinos Perdidos" subtitle="10" description="Treinos perdidos nos ultimos 30 dias" />
                    </div>
                    <CalendarComponent />
                  </div>
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  )
}
