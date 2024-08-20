'use client'

import Header from '@/components/Header'
import List from '@/components/List'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import * as PersonalFilters from "../../types/PersonalFilter";
import apiService from '@/services/userServices'
import { getUserId } from '@/helpers/jwtUtils'
import RegisterWarning from '@/components/RegisterWarning'

const personalTrainers = [
    {
        name: "João Silva",
        email: "joao.silva@example.com",
        role: "Especialista em Musculação",
        imageUrl: 'https://www.computan.com/hubfs/Kassem-1.jpg',
        specializations: ["Musculação", "Treinamento Funcional"],
        reviews: 3,
        location: "São Paulo, SP",
        price: "R$80 por sessão",
    },
    {
        name: "Ana Pereira",
        email: "ana.pereira@example.com",
        role: "Treinadora de Condicionamento Físico",
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        specializations: ["Cardio", "Pilates"],
        reviews: 4.9,
        location: "Rio de Janeiro, RJ",
        price: "R$100 por sessão",
    }
];

type personalType = {
    name: string,
    email: string,
    role?: string,
    imageUrl?: string,
    specializations?: string[],
    reviews?: number,
    location?: string,
    price?: string
}

const sortOptions = [
    { name: 'Melhor Avaliação', current: false },
    { name: 'Preço: Menor para Maior', current: false },
    { name: 'Preço: Maior para Menor', current: false },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const Personals = () => {
    // const [personals, setPersonals] = useState<personalType[]>(personalTrainers);
    const [status, setStatus] = useState<boolean>(false);

    // const fetchPersonals = async () => {
    //     try {
    //         const data = await apiService.getPersonals("personals", 1);
    //         if (Array.isArray(data)) {
    //             setPersonals(data);
    //         } else {
    //             console.error("Dados inesperados:", data);
    //         }
    //     } catch (error) {
    //         console.error("Erro ao buscar treinos:", error);
    //     } finally {
    //         //setLoading(false);
    //     }
    // };

    useEffect(() => {
        const id = getUserId() as number;
        apiService.getLoggedUser("users", id).then((user) => {
            setStatus(user.status);
        });
    }, []);

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState<PersonalFilters.SelectedFilters>({
        specialization: [],
        rating: [],
        location: [],
    })
    const [sortOption, setSortOption] = useState(sortOptions[0]);

    const handleFilterChange = (filterId: PersonalFilters.FilterType, value: string) => {
        setSelectedFilters(prev => {
            if (filterId === 'rating') {
                // Se a categoria é 'rating', desmarque se já estiver marcado
                return {
                    ...prev,
                    rating: prev.rating.includes(value) ? [] : [value],  // Se o valor estiver marcado, desmarque-o
                };
            } else {
                const currentFilters = prev[filterId];
                const isChecked = currentFilters.includes(value);

                return {
                    ...prev,
                    [filterId]: isChecked
                        ? currentFilters.filter(v => v !== value)
                        : [...currentFilters, value],
                };
            }
        });
    };


    const filterPersonalTrainers = () => {
        const filtered = personalTrainers.filter(trainer => {
            const matchesSpecialization = selectedFilters.specialization.length === 0 ||
                trainer.specializations.some(spec => selectedFilters.specialization.includes(spec.toLowerCase()))

            const matchesRating = selectedFilters.rating.length === 0 ||
                selectedFilters.rating.some(rating => trainer.reviews >= parseFloat(rating))

            const matchesLocation = selectedFilters.location.length === 0 ||
                selectedFilters.location.includes(trainer.location.replace(', SP', '').replace(', RJ', '').toLowerCase())

            return matchesSpecialization && matchesRating && matchesLocation
        });

        // Apply sorting
        return filtered.sort((a, b) => {
            switch (sortOption.name) {
                case 'Melhor Avaliação':
                    return b.reviews - a.reviews; // Highest rating first
                case 'Preço: Menor para Maior':
                    return parseFloat(a.price.replace('R$', '').replace(' por sessão', '').replace(',', '.')) -
                        parseFloat(b.price.replace('R$', '').replace(' por sessão', '').replace(',', '.')); // Lowest price first
                case 'Preço: Maior para Menor':
                    return parseFloat(b.price.replace('R$', '').replace(' por sessão', '').replace(',', '.')) -
                        parseFloat(a.price.replace('R$', '').replace(' por sessão', '').replace(',', '.')); // Highest price first
                default:
                    return 0;
            }
        });
    }

    const filteredTrainers = filterPersonalTrainers()

    return (
        <>
            <div className="min-h-full">
                <Header />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Personais</h1>
                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSortOption(option);
                                                    }}
                                                    className={classNames(
                                                        option === sortOption ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>
                <div className="bg-white">
                    <div>
                        {/* Mobile filter dialog */}
                        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                            <DialogBackdrop
                                transition
                                className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                            />

                            <div className="fixed inset-0 z-40 flex">
                                <DialogPanel
                                    transition
                                    className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                                >
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            onClick={() => setMobileFiltersOpen(false)}
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        {PersonalFilters.filters.map((section) => (
                                            <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                            <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <DisclosurePanel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    checked={selectedFilters[section.id as PersonalFilters.FilterType].includes(option.value)}
                                                                    onChange={() => handleFilterChange(section.id as PersonalFilters.FilterType, option.value)}
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    type="checkbox"
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </DisclosurePanel>
                                            </Disclosure>
                                        ))}
                                    </form>
                                </DialogPanel>
                            </div>
                        </Dialog>
                        
                        {status ? (
                            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <section aria-labelledby="products-heading" className="pb-24 pt-6">
                                <h2 id="products-heading" className="sr-only">
                                    Personais
                                </h2>

                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                    {/* Filters */}
                                    <form className="hidden lg:block">
                                        {PersonalFilters.filters.map((section) => (
                                            <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                            <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <DisclosurePanel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    checked={selectedFilters[section.id as PersonalFilters.FilterType].includes(option.value)}
                                                                    onChange={() => handleFilterChange(section.id as PersonalFilters.FilterType, option.value)}
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    type="checkbox"
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </DisclosurePanel>
                                            </Disclosure>
                                        ))}
                                    </form>

                                    {/* Product grid */}
                                    <div className="lg:col-span-3">
                                        <List personais={filteredTrainers} />
                                    </div>
                                </div>

                            </section>
                        </main>
                        ): (
                            <RegisterWarning/>
                        )}
                        

                    </div>
                </div>
            </div>
        </>
    )
}

export default Personals
