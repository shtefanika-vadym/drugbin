export interface IAuthLogin {
  email: string
  password: string
}

export interface IAuthRegister extends IAuthLogin {
  name: string
}
