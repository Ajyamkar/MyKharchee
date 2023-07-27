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

interface authenticateWithGoogleDataType {
  code: string;
  forLogin: boolean;
}

interface addExpenseCategoryDataType {
  categoryName: string;
  categoryType: string;
}

export type {
  signupDataType,
  loginDataType,
  updatePasswordDataType,
  authenticateWithGoogleDataType,
  addExpenseCategoryDataType,
};
