"use client"

import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react'
import apiService from '@/services/contractServices'
import ContractType from '@/types/Contract';
import { getUserId } from '@/helpers/jwtUtils';
import ContractModal from '@/components/ContractModal';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type ActiveContract = {
  id: number,
  status: boolean
}

export default function Contracts() {
  const [loading, setLoading] = useState<boolean>(true);
  const [contracts, setContracts] = useState<any[]>();
  const categories = ["Feitos", "Pendentes"];
  const [tab, setTab] = useState<string>("Feitos");
  const [activeContract, setActiveContract] = useState<ActiveContract | null>(null);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [aluno, setAluno] = useState<number>();
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchContracts = async () => {
    try {
      const personalId = getUserId();
      const data = await apiService.getContracts("get", 1, personalId as number);
      
      if (Array.isArray(data)) {
        setContracts(data);
      } else {
        console.error("Dados inesperados:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [refresh]);

  const contractsByCategory = {
    Feitos: contracts?.filter((contract) => contract.status === true),
    Pendentes: contracts?.filter((contract) => contract.status === false),
  };

  const tabChange = () => {
    return tab === "Feitos" ? setTab("Pendentes") : setTab("Feitos");
  }

  const handleContractClick = (contract: any) => {
    setActiveContract({id: contract.id, status: contract.status});
    setToggleModal(true);
  }

  return (
    <>
      <div className="min-h-full">
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <>
            <header className="bg-white shadow">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Contratos</h1>
              </div>
            </header>
            <main>
              <div className="mx-auto w-full max-w-2xl px-2 py-6 sm:px-0">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-indigo-700 p-1">
                    {categories.map((category) => (
                      <Tab
                        onClick={tabChange}
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-300 ease-in-out',
                            'ring-white/60 ring-offset-2',
                            selected
                              ? 'bg-white text-indigo-700 shadow'
                              : 'text-white hover:bg-white/[0.12] hover:text-white'
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {Object.values(categories).map((posts, idx) => (
                      <Tab.Panel
                        key={idx}
                        className={classNames(
                          'rounded-xl bg-white p-3 w-full',
                          'ring-red/60 ring-offset-2',
                        )}
                      >
                        <ul>
                          {contracts && contractsByCategory[tab as keyof typeof contractsByCategory]?.map((contract) => (
                            <li
                              key={contract.id}
                              className={classNames(
                                'relative rounded-md p-3 hover:bg-gray-100 cursor-pointer',
                                activeContract === contract.id ? 'border-2 border-indigo-700' : ''
                              )}
                              onClick={() => { handleContractClick(contract)}}
                            >
                              <h3 className="text-sm leading-5 text-indigo-900 font-semibold">
                                {`${tab === "Feitos" ? "Contrato realizado: " : "Solicitação de contrato: "} ${contract.id}`}
                              </h3>

                              <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                <li>{"post.date"}</li>
                                <li>&middot;</li>
                                <li>{"post.commentCount"} comments</li>
                                <li>&middot;</li>
                                <li>{"post.shareCount"} shares</li>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </div>
              {toggleModal && (
                <ContractModal activeContract={activeContract} refresh={setRefresh} alunoId={aluno as number} toggleModal={setToggleModal} />
              )}
            </main>
          </>
        )}
      </div>
    </>
  );
}
