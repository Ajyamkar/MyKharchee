/**
 * Type for Snackbar.
 */
export interface SnackbarType {
  isOpened: boolean;
  status: "success" | "error";
  message: string;
}

/*
 * Type for list of expense categories that will be created by user.
 */
export interface ExpensesCategoriesListType {
  name: string;
  type: ExpensesCategoryType;
}

/**
 * Type for type of expense category.
 */
export type ExpensesCategoryType =
  | "Essentails"
  | "Leisure"
  | "Loans"
  | "Investments";
