import { Button } from "@mui/material";
import { ExpensesCategoriesListType, IncomeCategoriesListType } from "../Types";
import "./CategoriesButtonList.scss";

interface CategoriesButtonListProps {
  categoriesList: Array<ExpensesCategoriesListType | IncomeCategoriesListType>;
  selectedCategoryId: string;
  categoryListType: "addIncome" | "addExpenses";
  setSelectedCategoryId: (id: string) => void;
  removeSelectedCategory?: (id: string) => void;
}

/**
 * Component to render list of categories button for AddExpenses and AddIncome sections.
 *
 * @param props.categoriesList - list of categories for income or expenses, for income type is string & for expense type is object
 * @param props.selectedCategoryId - id of selected category
 * @param props.categoryListType - categories list to be rendered for addIncome/addExpenses
 * @param props.setSelectedCategoryId - function to select the category
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
    categoryToDelete: ExpensesCategoriesListType | IncomeCategoriesListType
  ): void => {
    if (props.categoryListType === "addIncome") {
      return;
    }
    props.removeSelectedCategory?.(categoryToDelete.id);
  };

  return (
    <div className="categories-button-list">
      {props.categoriesList.map((category) => {
        return (
          <Button
            key={category.id}
            className={`category-button ${
              category.id === props.selectedCategoryId
                ? "selected-category-button"
                : ""
            }`}
            onClick={() => {
              props.setSelectedCategoryId(category.id);
            }}
            onDoubleClick={() => {
              handleDoubleClick(category);
            }}
          >
            {category.categoryName}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoriesButtonList;
