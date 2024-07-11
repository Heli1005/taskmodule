import * as Yup from "yup";

export const TaskSchema = Yup.object().shape(
    {
        title: Yup.string().required('Required'),
        desc: Yup.string(),
        duedate: Yup.date()
            .min(new Date(), "Date and time must be in the future")
            .required("Date and time is required"),
        iscompleted: Yup.string()
    }
)