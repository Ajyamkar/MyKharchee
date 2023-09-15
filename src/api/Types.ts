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

interface addExpenseDataType {
  date: Date;
  itemName: string;
  amount: number;
  categoryId: string;
}

interface addExpenseCategoryDataType {
  categoryName: string;
  categoryType: string;
}

interface deleteExpenseCategoryDataType {
  expenseCategoryId: string;
}

interface addIncomeDataType {
  date: Date;
  amount: number;
  categoryId: string;
}

export type {
  signupDataType,
  loginDataType,
  updatePasswordDataType,
  authenticateWithGoogleDataType,
  addExpenseDataType,
  addExpenseCategoryDataType,
  deleteExpenseCategoryDataType,
  addIncomeDataType,
};
