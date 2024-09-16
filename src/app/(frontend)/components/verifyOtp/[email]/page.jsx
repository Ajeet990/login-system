'use client'

import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import MiniLoader from '../../miniLoader/page'
import { verifyOtpValidation } from '@/app/(frontend)/schema/verifyOtp/route.js'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'


const VerifyOtp = ({ params }) => {
    const email_url = params.email
    const router = useRouter()
    const email = decodeURIComponent(email_url ?? "");
    const initialValues = {
        email : email ?? "",
        otp : ""
    }

    const onSubmit = async (values, {setSubmitting}) => {
        // console.log("Here verifying", values)
        const updateVerification = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/verifyOtp', {
            email : values.email,
            otp : values.otp
        })
        if (updateVerification.data.success) {
            toast.success(updateVerification.data.message)
            router.push('/components/login')
        } else {
            toast.error(updateVerification.data.message)
        }
        setSubmitting(false)
    }
    return (
        <div className="flex justify-center">
            <div className=" my-3 w-1/3 border rounded-lg border-gray-300 shadow-md bg-white min-h-[100px] p-3">
                <div className='flex justify-center my-2'>
                    <h1 className='font-bold'>Verify OTP</h1>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={verifyOtpValidation}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='flex my-2'>
                                <div className="flex flex-col w-1/3 text-end mr-3">
                                    <label className='my-1 p-2' htmlFor="email">Email</label>
                                    <label className='my-1 p-2' htmlFor="OTP">OTP</label>
                                </div>
                                <div className="flex flex-col w-2/3">
                                    <Field name="email" className='border rounded-lg my-1 p-2' type="text" placeholder='Enter email' />
                                    <ErrorMessage name='email' component='div' className='text-red-500' />
                                    <Field name="otp" className='border rounded-lg my-1 p-2' type="text" placeholder='Enter OTP' />
                                    <ErrorMessage name='otp' component='div' className='text-red-500' />
                                </div>
                            </div>
                            <div className="flex justify-end">

                                <button
                                    type='submit'
                                    className='bg-green-200 px-4 py-2 rounded-lg'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (<div className='flex item-center'><span>Verify</span><MiniLoader /></div>) : 'Verify'}
                                </button>
                            </div>
                        </Form>
                    )}

                </Formik>


            </div>
        </div>
    )
}

export default VerifyOtp
