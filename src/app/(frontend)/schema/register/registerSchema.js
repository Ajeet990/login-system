import * as Yup from 'yup'

export const registerFromValidation = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min('5', 'Name must be at least 5 character'),
    address: Yup.string()
        .required('Adderess is required')
        .min(10, 'Address should be at least 10 character'),
    email: Yup.string()
        .required('Email is required')
        .email("Please enter valid email"),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})