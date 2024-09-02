export interface ILogin {
    password: string;
    userName: string;
}

export interface IRegister extends ILogin {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}