export class SignInRequestDto {
  email!: string;

  password!: string;
}

export class SignInResponseDto {}

export class RequestNewPasswordRequestDto {
  email!: string;
}

export class RequestNewPasswordResponseDto {}

export class ResetPasswordRequestDto {
  code!: string;

  new_password!: string;
}


export class ResetPasswordResponseDto {}