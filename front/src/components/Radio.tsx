// components/Radio.tsx
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import SignInForm from '@/types/SignInForm';

interface RadioProps extends UseControllerProps<SignInForm> {
  options: { value: string, label: string }[];
}

const Radio = ({ options, ...props }: RadioProps) => {
  const { field } = useController(props);

  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={option.value}
            value={option.value}
            checked={field.value === option.value}
            onChange={() => field.onChange(option.value)}
            className="mr-2 accent-indigo-600" // Adiciona uma margem à direita e cor personalizada
          />
          <label htmlFor={option.value} className="text-gray-700 text-sm">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
