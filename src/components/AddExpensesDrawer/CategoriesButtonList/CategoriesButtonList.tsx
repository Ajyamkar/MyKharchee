import { Button } from "@mui/material";
import { ExpensesCategoriesListType } from "../Types";
import "./CategoriesButtonList.scss";

interface CategoriesButtonListProps {
  categoriesList: Array<ExpensesCategoriesListType | string>;
  selectedCategoryIndex: number | undefined;
  categoryListType: "addIncome" | "addExpenses";
  setSelectedCategoryIndex: (index: number) => void;
  removeSelectedCategory?: (id: string) => void;
}

/**
 * Component to render list of categories button for AddExpenses and AddIncome sections.
 *
 * @param props.categoriesList - list of categories for income or expenses, for income type is string & for expense type is object
 * @param props.selectedCategoryIndex - index of selected category
 * @param props.categoryListType - categories list to be rendered for addIncome/addExpenses
 * @param props.setSelectedCategoryIndex - function to select the category
 * @param props.removeSelectedCategory{optional} - function to remove the selected category
 */
const CategoriesButtonList = (props: CategoriesButtonListProps) => {
  /**
   * Function to remove category,
   * Currently only applicable for removing expenses category.
   *
   * @param index - selected category index to be removed.
   */
  const handleDoubleClick = (
    categoryToDelete: ExpensesCategoriesListType | string
  ): void => {
    if (props.categoryListType === "addIncome") {
      return;
    }
    isExpenseCategory(categoryToDelete) &&
      props.removeSelectedCategory?.(categoryToDelete.id);
  };

  /**
   * Function to predict the type of current category i.e is it a expense category
   * @param category - current category
   */
  const isExpenseCategory = (
    category: ExpensesCategoriesListType | string
  ): category is ExpensesCategoriesListType =>
    (category as ExpensesCategoriesListType).id !== undefined;

  return (
    <div className="categories-button-list">
      {props.categoriesList.map((category, index) => {
        return (
          <Button
            key={isExpenseCategory(category) ? category.id : index}
            className={`category-button ${
              index === props.selectedCategoryIndex
                ? "selected-category-button"
                : ""
            }`}
            onClick={() => {
              props.setSelectedCategoryIndex(index);
            }}
            onDoubleClick={() => {
              handleDoubleClick(category);
            }}
          >
            {isExpenseCategory(category) ? category.categoryName : category}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoriesButtonList;
