import React from 'react';

type DropdownProps = {
  listAlunos: { name: string, id: number | null  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedAluno: number;
};

const WorkoutDropdown = ({ listAlunos, onChange, selectedAluno }: DropdownProps) => {

  listAlunos = listAlunos.filter((aluno, index) => index !== 0)

  return (
    <select
      className="w-full p-2 mt-2 border-2 border-indigo-600 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-all duration-200"
      name="selectedAluno"
      aria-label="Selecione um aluno"
      onChange={onChange}
      value={selectedAluno}
    >
      <option value="" disabled selected>Selecione um aluno</option>
      {listAlunos.map((aluno) => (
        <option key={aluno.id} value={aluno.id as number}>
          {aluno.name}
        </option>
      ))}
    </select>
  );
};

export default WorkoutDropdown;
