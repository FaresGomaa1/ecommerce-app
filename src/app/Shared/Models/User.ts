export class Login  {
    constructor(public password: string, public userName: string) {}
  }
  
 export class Register extends Login  {
    constructor(password: string, userName: string, public firstName: string, public lastName: string, public phone: string, public email: string) {
      super(password, userName);
    }
  }