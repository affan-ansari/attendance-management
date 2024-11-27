import * as Yup from "yup";

export const loginFormSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    pin: Yup.string().min(4, "PIN must be atlease 4 characters").required("PIN is required"),
});

export const firstLoginFormSchema = Yup.object().shape({
    pin: Yup.string().min(4, "PIN must be atlease 4 characters").required("PIN is required"),
});

export const userAddEditSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    designation: Yup.string().required("Designation is required"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
});
