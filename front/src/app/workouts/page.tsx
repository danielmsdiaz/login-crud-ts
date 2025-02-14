"use client"

import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import { useState, useEffect } from 'react';
import apiService from '@/services/personalServices';
import { getUserId } from '@/helpers/jwtUtils';
import WorkoutType from '@/types/Workout';
import WorkoutModal from '@/components/WorkoutModal';
import Loader from '@/components/Loader';
import Overview from '@/components/WorkoutOverview';
import { UserIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Workouts() {
  const personalId = getUserId();
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [workout, setWorkout] = useState<WorkoutType>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openOverview, setOpenOverview] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlunos, setShowAlunos] = useState(false);
  const [showStatus, setShowStatus] = useState(false);


  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const toggleOverview = (workout: WorkoutType) => {
    setWorkout(workout);
    setTimeout(() => setOpenOverview(true), 0);
  };

  const fetchWorkouts = async () => {
    try {
      const data = await apiService.getWorkouts("workout", personalId as number);
      if (Array.isArray(data)) {
        setWorkouts(data);
      } else {
        console.error("Dados inesperados:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar treinos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
            {loading ? (
              <Loader />
            ) : workouts.length > 0 ? (
              <>
                <div className='w-full flex items-center mb-5'>
                  <section className='flex w-full justify-center xl:justify-normal gap-x-5'>
                    <div className='w-[120px] relative'>
                      <div className='border-2 border-indigo-700 h-[50px] flex items-center justify-center gap-x-3 rounded-md shadow-md cursor-pointer bg-gray-100/80'>Alunos<ChevronDownIcon height={20} /></div>
                      {showAlunos && (
                        <div className="absolute left-0 mt-1 w-32 bg-white shadow-lg rounded-md p-2">
                          <label className="flex items-center gap-2">
                            <input type="radio" name="aluno" /> João
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="aluno" /> Maria
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="aluno" /> Pedro
                          </label>
                        </div>
                      )}
                    </div>
                    <div className='w-[120px]'>
                      <div className='border-2 border-indigo-700 h-[50px] flex items-center justify-center gap-x-3 rounded-md shadow-md cursor-pointer bg-gray-100/80'>Status <ChevronDownIcon height={20} /></div>
                    </div>
                    <section className='w-[500px] hidden xl:flex'>
                      <div className="relative w-full">
                        <MagnifyingGlassIcon height={25} className="absolute left-2 top-1/2 -translate-y-1/2 text-indigo-500" />
                        <input
                          className="h-[50px] w-full pl-10 rounded-md outline-none bg-gray-100/80 shadow-md"
                          type="text"
                          placeholder="Digite seu nome..."
                        />
                        <button className='absolute bg-indigo-700/80 top-[10px] right-3 text-white rounded-md px-4 py-1'>Buscar</button>
                      </div>
                    </section>
                  </section>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {workouts.map((workout) => (
                    <div onClick={() => { toggleOverview(workout) }} key={workout.id} className="group bg-gray-100 rounded-lg p-4 max-h-[200px] min-h-[168px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 capitalize mb-2">{workout.title}</h3>
                        <p className="mt-2 text-sm text-gray-700 font-medium">Exercícios:</p>
                        <ul className="list-disc list-inside text-sm text-gray-500 max-h-[120px] overflow-hidden">
                          {workout.exercises.slice(0, 2).map((exercise, index) => (
                            <li key={index} className="text-ellipsis">{exercise.name} - {exercise.reps} repetições</li>
                          ))}
                          {workout.exercises.length > 2 && (
                            <li className="text-ellipsis text-gray-500">... e mais</li>
                          )}
                        </ul>
                      </div>

                      <p className='text-sm flex items-center mt-2 self-start'>
                        <UserIcon height={15} className="mr-2 text-indigo-500" />
                        {`${workout.aluno.name} ${workout.aluno.lastName}`}
                      </p>
                    </div>
                  ))}
                  {workout && (
                    <Overview personalId={personalId as number} fetchWorkouts={fetchWorkouts} workout={workout as WorkoutType} open={openOverview} setOpen={setOpenOverview} />
                  )}
                  {/* Card para criar um novo treino */}
                  <div className="group bg-gray-100 p-4 rounded-lg flex items-center justify-center min-h-[168px]">
                    <button onClick={toggleModal} className="text-sm font-medium text-indigo-700">Criar Novo Treino</button>
                  </div>
                  {openModal && (
                    <WorkoutModal personalId={personalId as number} fetchWorkouts={fetchWorkouts} toggleModal={toggleModal} />
                  )}
                </div>
              </>
            ) : (
              <HeroSection personalId={personalId as number} fetchWorkouts={fetchWorkouts} />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
