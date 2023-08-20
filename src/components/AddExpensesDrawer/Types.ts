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

export interface IncomeCategoriesListType {
  id: string;
  categoryName: string;
}
