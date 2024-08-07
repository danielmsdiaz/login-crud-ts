export const filters = [
    {
        id: 'specialization',
        name: 'Especialidade',
        options: [
            { value: 'musculação', label: 'Musculação', checked: false },
            { value: 'treinamento funcional', label: 'Treinamento Funcional', checked: false },
            { value: 'cardio', label: 'Cardio', checked: false },
            { value: 'pilates', label: 'Pilates', checked: false },
        ],
    },
    {
        id: 'rating',
        name: 'Avaliação',
        options: [
            { value: '4', label: '4 Stars & Up', checked: false },
            { value: '4.5', label: '4.5 Stars & Up', checked: false },
            { value: '5', label: '5 Stars', checked: false },
        ],
    },
    {
        id: 'location',
        name: 'Local',
        options: [
            { value: 'são paulo', label: 'São Paulo, SP', checked: false },
            { value: 'rio de janeiro', label: 'Rio de Janeiro, RJ', checked: false },
            // Add more locations as needed
        ],
    },
]

export type FilterType = 'specialization' | 'rating' | 'location';

export type SelectedFilters = {
    specialization: string[];
    rating: string[];
    location: string[];
}