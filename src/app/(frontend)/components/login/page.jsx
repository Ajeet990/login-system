'use client'

import React from 'react';
import { loginFromValidation } from '../../schema/login/loginSchema';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signIn } from "next-auth/react";
import { toast } from 'react-toastify'; // Toastr import
import { useSession } from 'next-auth/react';
import MainLoader from '@/app/(frontend)/components/mainLoader/page.jsx';
import MiniLoader from '../miniLoader/page';

const LoginForm = () => {
    const router = useRouter()
    const { data: userData, status } = useSession()

    if (status === 'loading') {
        return <div><MainLoader /></div>
    }
    if (userData) {
        router.push('/components/dashboard')
    }
    const initialValues = {
        email: "",
        password: ""
    }


    
    const onSubmit = async (values, { setSubmitting }) => {
        toast.dismiss(); 
        const { email, password } = values
        try {
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
                email,
                password
            })
            // console.log("login data", resp)
            if (resp.data.success) {
                const res = await signIn("credentials", {
                    redirect: false,
                    email: email,
                    password: password,
                });
                // console.log("authnext : ", res)
                // console.log("myapi", resp)
                toast.success("Logged in successfully")
                router.push('/components/dashboard')
            } else {
                toast.error(resp.data.message)
            }
            setSubmitting(true)
        } catch (error) {
            console.error("Error submitting form", error)
        }
    }

    const handleRegister = () => {
        router.push('/components/register')
    }

    return (
        <div className="flex justify-center">
            <div className=" my-3 w-1/3 border rounded-lg border-gray-300 shadow-md bg-white min-h-[100px] p-3">
                <div className='flex justify-center my-2'>
                    <h1 className='font-bold'>Login Form</h1>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginFromValidation}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='flex my-2'>
                                <div className="flex flex-col w-1/3 text-end mr-3">
                                    <label className='my-1 p-2' htmlFor="email">Email</label>
                                    <label className='my-1 p-2' htmlFor="password">Password</label>
                                </div>
                                <div className="flex flex-col w-2/3">
                                    <Field name="email" className='border rounded-lg my-1 p-2' type="text" placeholder='Enter email' />
                                    <ErrorMessage name='email' component='div' className='text-red-500'/>
                                    <Field name="password" className='border rounded-lg my-1 p-2' type="password" placeholder='Enter your password' />
                                    <ErrorMessage name='password' component='div' className='text-red-500'/>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                
                                <button
                                    type='submit'
                                    className='bg-green-200 px-4 py-2 rounded-lg'
                                    disabled={isSubmitting}
                                >
                                    {/* {isSubmitting ? (<span className='flex'>Login <MiniLoader /></span>) : 'Login'} */}
                                    {isSubmitting ? (<div className='flex item-center'><span>Login</span><MiniLoader /></div>) : 'Login'}
                                </button>
                                <button
                                type='button'
                                className='ml-2 bg-green-200 px-4 py-2 rounded-lg'
                                onClick={handleRegister}>
                                    Register
                                </button>
                            </div>
                        </Form>
                    )}

                </Formik>


            </div>
        </div>
    );
};

export default LoginForm;
