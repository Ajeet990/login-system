import * as Yup from 'yup'

export const verifyOtpValidation = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email("Please enter valid email"),
    otp: Yup.string()
        .required('OTP is required')
        .min(4, "OTP should be of 4 digits")
})