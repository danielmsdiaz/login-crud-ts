import React from 'react'
import Form from '@/components/Form'
import Title from '@/components/Title'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'

const Login = () => {
    return (
        <section className='bg-indigo-200 dark:bg-gray-900 flex h-screen'>
            <div className='flex items-center justify-center w-1/2 bg-white'>
                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Title>Login</Title>
                        <Form>
                            <Label>Email:</Label>
                            <Input />
                            <Label>Senha:</Label>
                            <Input />
                            <Button>Entrar</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Login