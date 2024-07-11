import * as Yup from "yup";

export const SignUpSchema = Yup.object(
    {
        username: Yup.string().min(2, 'Name must be at least 2 characters').max(25).required('Required'),
        password: Yup.string().min(6).required('Required'),
        confirmpassword: Yup.string().min(6).oneOf([Yup.ref('password'), null], 'Not matched').required('Required')
    }
)