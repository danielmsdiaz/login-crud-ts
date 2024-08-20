import React, { useState, useEffect, useRef } from 'react';
import specializations from '@/data/specializations';
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { PersonalProfileForm } from '@/types/ProfileForm';

type DropdownProps = {
    register: UseFormRegister<PersonalProfileForm>;
    setValue: UseFormSetValue<PersonalProfileForm>;
    trigger: UseFormTrigger<PersonalProfileForm>;
    errors: any;
};

const Dropdown = ({ register, setValue, trigger, errors }: DropdownProps) => {
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
    const [hideOptions, setHideOptions] = useState<boolean>(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setValue('specializations', selectedSpecializations.join(','));
        if (selectedSpecializations.length) {
            trigger('specializations');
        }
    }, [selectedSpecializations, setValue, trigger]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setHideOptions(true); // Fecha o dropdown se o clique for fora do componente
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSetSpecialization = (newSpecialization: string) => {
        if (!selectedSpecializations.includes(newSpecialization)) {
            setSelectedSpecializations([...selectedSpecializations, newSpecialization]);
        }
    };

    const handleRemoveSpecialization = (specialization: string) => {
        setSelectedSpecializations(selectedSpecializations.filter((item) => item !== specialization));
    };

    return (
        <div className="w-full md:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dropdown">
                Especializações
            </label>
            <div ref={dropdownRef} className="relative">
                <div
                    className={`border border-gray-300 rounded-md shadow-sm bg-white focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 ${selectedSpecializations.length === 0 ? 'py-2' : ''
                        }`}
                >
                    <div className="flex flex-wrap items-center p-2">
                        {selectedSpecializations.length === 0 && (
                            <span className="text-gray-400 text-sm">Selecione uma especialização</span>
                        )}
                        {selectedSpecializations.map((item) => (
                            <div
                                key={item}
                                className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-teal-100 rounded-full text-teal-700 border border-teal-300"
                            >
                                <span className="text-xs font-normal leading-none">{item}</span>
                                <svg
                                    onClick={() => handleRemoveSpecialization(item)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 ml-2 cursor-pointer"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-600 focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            setHideOptions(!hideOptions);
                        }}
                    >
                        {hideOptions ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                </div>
                {hideOptions || (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1">
                        {specializations.map((specialization) => (
                            <div
                                key={specialization}
                                className="cursor-pointer p-2 hover:bg-gray-100"
                                onClick={() => handleSetSpecialization(specialization)}
                            >
                                {specialization}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {errors.specializations && (
                <span className="text-red-500 text-sm">{errors.specializations.message}</span>
            )}
            <input
                type="hidden"
                {...register('specializations', { required: 'Selecione pelo menos uma especialização' })}
            />
        </div>
    );
};

export default Dropdown;
