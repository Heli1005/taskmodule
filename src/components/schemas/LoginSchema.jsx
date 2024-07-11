import * as Yup from "yup";

export const LoginSchema = Yup.object(
    {
        username: Yup.string().required('Required'),
        password: Yup.string().min(6).required('Required'),
    }
)