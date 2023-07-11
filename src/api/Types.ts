interface signupDataType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface loginDataType {
  email: string;
  password: string;
}

interface updatePasswordDataType {
  email: string;
  updatedPassword: string;
}

export type { signupDataType, loginDataType, updatePasswordDataType };
