"use client"

import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import { useState, useEffect } from 'react';
import apiService from '@/services/personalServices';
import { getUserId } from '@/helpers/jwtUtils';
import WorkoutType from '@/types/Workout';

export default function Workouts() {
  const personalId = getUserId();
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await apiService.getWorkouts("workout", personalId as number);
        // Verifique se data é um array
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else {
          console.error("Dados inesperados:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar treinos:", error);
      }
    };

    fetchWorkouts();
  }, [personalId]);

  return (
    <>
      <div className="min-h-full">
        <Header />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Treinos</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {Array.isArray(workouts) && workouts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {workouts.map((workout) => (
                  <div key={workout.id} className="group bg-gray-100 p-4 rounded-lg">
                    <h3 className="mt-4 text-sm font-medium text-gray-700">{workout.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{workout.description || "Sem descrição"}</p>
                    <p className="mt-2 text-sm text-gray-700 font-medium">Exercícios:</p>
                    <ul className="list-disc list-inside text-sm text-gray-500">
                      {workout.exercises.map((exercise, index) => (
                        <li key={index}>{exercise.name} - {exercise.reps} repetições</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {/* Card para criar um novo treino */}
                <div className="group bg-gray-100 p-4 rounded-lg flex items-center justify-center">
                  <button className="text-sm font-medium text-indigo-700">Criar Novo Treino</button>
                </div>
              </div>
            ) : (
              <HeroSection />
            )}
          </div>
        </main>
      </div>
    </>
  );
}