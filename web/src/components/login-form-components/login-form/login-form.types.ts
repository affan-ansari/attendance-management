export interface LoginFormTypes {
    username: string;
    pin: string;
}

export interface ILoginUserData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    designation: string;
    role: string;
    isFirstLogin: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}
interface ILoginSuccess {
    token: string;
    user: ILoginUserData;
}

export interface ILoginResponse {
    status: string;
    data: ILoginSuccess;
}

export interface AuthState {
    currentUser: ILoginUserData | null;
}
