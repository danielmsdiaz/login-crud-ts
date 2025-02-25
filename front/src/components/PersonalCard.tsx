import React from 'react'
import PreviewRating from '@/components/PreviewRating'

type PersonalCardProps = {
    contract: any
}

const PersonalCard = ({ contract }: PersonalCardProps) => {
    const personal = contract?.personal || {}

    return (
        <div className="max-w-sm xl:min-w-[384px]">
            <div className="rounded-lg border bg-white px-4 pt-8 pb-7 shadow-lg">
                <div className="relative mx-auto w-36 rounded-full">
                    <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-indigo-500 ring-2 ring-indigo-300 ring-offset-2"></span>
                    <img
                        className="mx-auto h-auto w-full rounded-full"
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                        alt="Personal Avatar"
                    />
                </div>
                <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
                    {personal?.name ? `${personal.name} ${personal.lastName || ''}` : ''}
                </h1>
                <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
                    {personal?.cargo || 'Você não possui personal'}
                </h3>
                <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
                    {personal?.bio || ''}
                </p>
                <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                    <li className="flex items-center py-3 text-sm">
                        <span>Status</span>
                        {contract?.personal?.name && (
                            <span className="ml-auto">
                                <span className="rounded-full bg-indigo-200 py-1 px-2 text-xs font-medium text-indigo-700">
                                    Online
                                </span>
                            </span>
                        )}
                    </li>
                    <li className="flex items-center py-3 text-sm">
                        <span>Contratado desde:</span>
                        <span className="ml-auto">
                            {contract?.updatedAt ? new Date(contract.updatedAt).toLocaleString() : ''}
                        </span>
                    </li>
                </ul>
                {contract?.personal?.name && (
                    <div className="flex items-center justify-center mt-5">
                        <PreviewRating />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PersonalCard
