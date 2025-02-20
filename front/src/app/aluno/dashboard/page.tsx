"use client"

import Header from '@/components/Header'
import Card from '@/components/Card'
import PersonalCard from '@/components/PersonalCard'
import CalendarComponent from '@/components/Calendar'

export default function Dashboard() {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center md:text-left">Meus treinos</h1>
        </div>
        <main>
          <div className="mx-auto max-w-7xl px-4 xl:py-6 sm:px-6 lg:px-8 pb-5">
            <div className="md:grid md:grid-cols-[1fr_1.7fr] items-start gap-x-6">
              <div className='flex flex-col items-center'>
                <PersonalCard />
                <button className='bg-indigo-700 text-white w-[343px] md:w-[384px] rounded-lg py-3 m-4 hover:bg-indigo-700/90'>Finalizar Contrato</button>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-4">
                  <Card className='flex-1' status='finished' title="Treinos Finalizados" subtitle="20" description="Treinos finalizados nos ultimos 30 dias" />
                  <Card className='flex-1' status='lost' title="Treinos Perdidos" subtitle="10" description="Treinos perdidos nos ultimos 30 dias" />
                </div>
                <CalendarComponent />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
