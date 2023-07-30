import { Button } from "@mui/material";
import { ExpensesCategoriesListType } from "../Types";
import "./CategoriesButtonList.scss";

interface CategoriesButtonListProps {
  categoriesList: Array<ExpensesCategoriesListType | string>;
  selectedCategoryIndex: number | undefined;
  categoryListType: "addIncome" | "addExpenses";
  setSelectedCategoryIndex: (index: number) => void;
  removeSelectedCategory?: (index: number) => void;
}

/**
 * Component to render list of categories button for AddExpenses and AddIncome sections.
 *
 * @param props.categoriesList - list of categories for income or expenses, for income type is string & for expense type is array
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
  const handleDoubleClick = (index: number): void => {
    if (props.categoryListType === "addIncome") {
      return;
    }
    props.removeSelectedCategory?.(index);
  };

  return (
    <div className="categories-button-list">
      {props.categoriesList.map((category, index) => {
        return (
          <Button
            key={typeof category === "string" ? index : category.id}
            className={`category-button ${
              index === props.selectedCategoryIndex
                ? "selected-category-button"
                : ""
            }`}
            onClick={() => {
              props.setSelectedCategoryIndex(index);
            }}
            onDoubleClick={() => {
              handleDoubleClick(index);
            }}
          >
            {typeof category === "string" ? category : category.categoryName}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoriesButtonList;
