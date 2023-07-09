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

export type { signupDataType, loginDataType };
