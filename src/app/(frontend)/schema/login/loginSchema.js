import * as Yup from 'yup'

export const loginFromValidation = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email("Please enter valid email"),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
})