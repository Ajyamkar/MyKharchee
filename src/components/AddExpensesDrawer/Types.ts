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
  id: string;
  categoryName: string;
  categoryType: ExpensesCategoryType;
}

/**
 * Type for type of expense category.
 */
export type ExpensesCategoryType =
  | "Essentails"
  | "Leisure"
  | "Loans"
  | "Investments";
