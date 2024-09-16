'use client'

import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation';
import { registerFromValidation } from '../../schema/register/registerSchema';
import { useSession } from 'next-auth/react';
import MiniLoader from '../miniLoader/page';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { toast } from 'react-toastify';
import MainLoader from '../mainLoader/page';

const registerForm = () => {
    const router = useRouter()
    const { data:userData, status } = useSession()

    if (status === 'loading') {
        return (<div><MainLoader /></div>)
    }
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: ""
    }

    if (userData) {
        router.push('/components/dashboard')
    }

    const onSubmit = async (values, { setSubmitting }) => {
        const {name, email, password, address} = values
        try {
            const registerRst = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+'/register', {
                name,
                email,
                password,
                address 
            })

            if (registerRst.data.success) {
                const otp = Math.floor(Math.random() * 9000) + 1000;
                const emailResponse = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+'/send-mail', { email, otp });
                if (emailResponse.data.success) {
                    const addOTP = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+'/addOtp', {
                        email,
                        otp
                    })
                    if (addOTP.data.success) {
                        router.push(`/components/verifyOtp/${email}`)
                    }
                    toast.success('Email sent successfully');
                } else {
                    toast.error('Error sending email');
                }
            } else {
                toast.error("Registration failed")
            }
            
            setSubmitting(false)
        } catch (error) {
            return NextResponse.json({
                success:false,
                message:"Something went wrong",
                error: error
            })
        }

    }

    const handleLogin = () => {
        router.push('/components/login')
    }

    const handleVerify = () => {
        const email = "example@yopmail.com"
        router.push(`/components/verifyOtp/${email}`)
    }
    return (
        <div className="flex justify-center">
            <div className="  my-3 w-1/3 border rounded-lg border-gray-300 shadow-md bg-white min-h-[100px] p-3">
                <div className='flex justify-center my-2'>
                    <h1 className='font-bold'>Registration Form</h1>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerFromValidation}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col">
                                <div className='flex my-1'>
                                    <div className="flex w-1/3 justify-end">
                                        <label className='' htmlFor="name">Name</label>
                                    </div>
                                    <div className="flex flex-col w-2/3">
                                        <Field
                                            name="name"
                                            className='mx-2 px-2 p-1 border rounded-lg w-full'
                                            type="text"
                                            placeholder='Enter name' />
                                        <ErrorMessage name='name' component='div' className='ml-1 text-red-500 ml-3' />
                                    </div>
                                </div>

                                <div className='flex my-1'>
                                    <div className="flex w-1/3 justify-end">
                                        <label className='' htmlFor="email">Email</label>
                                    </div>
                                    <div className="flex flex-col w-2/3">
                                        <Field
                                            name="email"
                                            className='mx-2 px-2 p-1 border rounded-lg w-full'
                                            type="text"
                                            placeholder='Enter email' />
                                        <ErrorMessage name='email' component='div' className='ml-1 text-red-500 ml-3' />
                                    </div>
                                </div>
                                <div className='flex my-1'>
                                    <div className="flex w-1/3 justify-end">
                                        <label className='' htmlFor="password">Password</label>
                                    </div>
                                    <div className="flex flex-col w-2/3">
                                        <Field
                                            name="password"
                                            className='mx-2 px-2 p-1 border rounded-lg w-full'
                                            type="password"
                                            placeholder='Enter password' />
                                        <ErrorMessage name='password' component='div' className='ml-1 text-red-500 ml-3' />
                                    </div>
                                </div>
                                <div className='flex my-1'>
                                    <div className="flex w-1/3 justify-end">
                                        <label className='' htmlFor="confirmPassword"> Confirm Password</label>
                                    </div>
                                    <div className="flex flex-col w-2/3">
                                        <Field
                                            name="confirmPassword"
                                            className='mx-2 px-2 p-1 border rounded-lg w-full'
                                            type="password"
                                            placeholder='Enter confirm password' />
                                        <ErrorMessage name='confirmPassword' component='div' className='ml-1 text-red-500 ml-3' />
                                    </div>
                                </div>
                                <div className='flex my-1'>
                                    <div className="flex w-1/3 justify-end">
                                        <label className='' htmlFor="address">Address</label>
                                    </div>
                                    <div className="flex flex-col w-2/3">
                                        <Field
                                            name="address"
                                            className='mx-2 px-2 p-1 border rounded-lg w-full'
                                            type="text"
                                            placeholder='Enter address' />
                                        <ErrorMessage name='address' component='div' className='ml-1 text-red-500 ml-3' />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type='submit'
                                    className='border bg-green-200 rounded-lg px-4 py-2'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (<div className="flex items-center"><span>Register</span>< MiniLoader /></div>) : (<span>Register</span>)}
                                </button>

                                <button
                                    type='button'
                                    className='border bg-green-200 rounded-lg px-4 py-2 ml-2'
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                                <button
                                    type='button'
                                    className='border bg-green-200 rounded-lg px-4 py-2 ml-2'
                                    onClick={handleVerify}
                                >
                                    VerifyOtp
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>


            </div>
        </div>
    )
}

export default registerForm


// 'use client'

// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { useRouter } from 'next/navigation';
// import { registerFromValidation } from '../../schema/register/registerSchema';

// const RegisterForm = () => {
//     const router = useRouter();
//     const initialValues = {
//         name: "",
//         email: "",
//         password: ""
//     };

//     const onSubmit = async (values, { setSubmitting }) => {
//         console.log("submitting", values);
//         setSubmitting(false);
//     };

//     return (
//         <div className="flex justify-center">
//             <div className="my-3 w-1/3 border rounded-lg border-gray-300 shadow-md bg-white min-h-[100px] p-3">
//                 <div className='flex justify-center my-2'>
//                     <h1 className='font-bold'>Register form</h1>
//                 </div>
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={registerFromValidation}
//                     onSubmit={onSubmit}
//                 >
//                     {({ isSubmitting }) => (
//                         <Form>
//                             <div className="mb-4">
//                                 <div className="flex w-full items-center">
//                                     <label className='w-1/3 text-right pr-3' htmlFor="name">Name</label>
//                                     <div className="w-2/3">
//                                         <Field
//                                             name="name"
//                                             className='w-full px-2 py-1 border rounded-lg'
//                                             type="text"
//                                             placeholder='Enter name' />
//                                         <ErrorMessage name='name' component='div' className='text-red-500 mt-1'/>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* Add more fields here as needed */}
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// };

// export default RegisterForm;

