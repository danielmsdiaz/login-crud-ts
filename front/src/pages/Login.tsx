import React from 'react'
import Form from '@/components/Form'
import Title from '@/components/Title'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import Info from '@/components/Info'

const Login = () => {
    return (
        <section className="dark:bg-gray-900 flex h-screen">
            <div className='flex items-center justify-center w-1/2 bg-white'>
                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Title>Login</Title>
                        <Form>
                            <div className='space-y-4 md:space-y-2'>
                                <Label>Email:</Label>
                                <Input type="email" placeholder="name@company.com" />
                            </div>
                            <div className='space-y-4 md:space-y-2'>
                                <Label>Senha:</Label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                            <Button>Entrar</Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Não possui conta? <a href="#" className="font-medium text-indigo-600 hover:underline dark:text-indigo-600">Inscreva-se</a>
                            </p>
                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OU</p>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <div className='w-1/2 bg-indigo-700 flex items-center justify-center'>
                <div className='flex items-center justify-center w-1/2'>
                    <Info></Info>
                </div>
            </div>
        </section>

    )
}

export default Login