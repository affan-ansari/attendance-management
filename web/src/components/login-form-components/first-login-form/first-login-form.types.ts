import { ILoginUserData } from "../login-form/login-form.types";

export interface FirstLoginFormTypes {
    pin: string;
}

export interface IFirstLoginResponse {
    status: string;
    data: ILoginUserData;
}
