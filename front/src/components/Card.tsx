import React from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'

type cardProps = {
    title: string;
    subtitle: string;
    description: string;
    className: string;
    status: string;
}

const Card = ({ title, subtitle, description, className, status }: cardProps) => {
    return (
        <div className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${className} `}>
            {status == "finished" ? <CheckCircleIcon className='mb-3 text-indigo-700' height={30} /> : <XCircleIcon className='mb-3 text-indigo-700' height={30} /> }
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white max-w-0">{title}</h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
            <p className="mb-1 text-lg font-medium text-gray-700 dark:text-gray-300">{subtitle}</p>
        </div>
    );
};

export default Card