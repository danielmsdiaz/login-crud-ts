"use client"

import Header from '@/components/Header'
import Card from '@/components/Card'
import CalendarComponent from '@/components/Calendar'
import AlunosCards from '@/components/AlunosCards'
import PreviewRating from '@/components/PreviewRating'

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
                            <div className='flex flex-col items-center md:items-start gap-y-4'>
                                <AlunosCards />
                                <div className='w-full h-[75px] border border-gray-200 rounded-lg shadow-sm pl-8 flex items-center gap-x-5 font-bold leading-none text-gray-900 dark:text-white'>
                                    Minha Avaliação:
                                    <div>
                                        <PreviewRating />
                                    </div>
                                </div>
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
            </div>
        </>
    )
}
