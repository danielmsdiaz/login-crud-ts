type WorkoutType = {
    id?: number
    title: string,
    description: string,
    exercises: {
        name: string,
        reps: string
    }[],
    aluno?:any
    alunoId?: number
}

export default WorkoutType;