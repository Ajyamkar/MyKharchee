import { ArrowBackRounded } from "@mui/icons-material";
import { Button, Radio, TextField } from "@mui/material";
import React from "react";
import {
  ExpensesCategoriesListType,
  ExpensesCategoryType,
  SnackbarType,
} from "../Types";
import "./AddCategory.scss";

interface AddCategoryProps {
  setShowAddNewCategoryModel: React.Dispatch<React.SetStateAction<boolean>>;
  expenseCategoriesList: Array<ExpensesCategoriesListType>;
  setExpenseCategoriesList: React.Dispatch<
    React.SetStateAction<Array<ExpensesCategoriesListType>>
  >;
  snackbarState: SnackbarType;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarType>>;
}

/**
 * List of expenses category types.
 */
const expensesTypes = [
  { name: "Essentails", eg: "Groceries, etc" },
  { name: "Leisure", eg: "Eating out, movie, etc" },
  { name: "Loans", eg: "Home loan, personal loan, etc" },
  { name: "Investments", eg: "Mutual funds, Shares, etc" },
];

/**
 * Component to create new category.
 *
 * @param props.expenseCategoriesList - list of categories of expenses.
 * @param props.snackbarState - feedback to be shown on creating new category.
 * @param props.setShowAddNewCategoryModel- callback function to show/hide this component.
 * @param props.setExpenseCategoriesList - callback function to update list of expenses category.
 * @param props.setSnackbarState - callback function to trigger feedback.
 */
const AddCategory = (props: AddCategoryProps) => {
  /**
   * State to keep track of category name.
   */
  const [categoryName, setCategoryName] = React.useState("");

  /**
   * State to keep track of expense category type.
   */
  const [selectedExpenseType, setSelectedExpenseType] =
    React.useState<ExpensesCategoryType | null>();

  /**
   * Add category button will be disabled
   * if one of field(name, type) is empty.
   */
  const shouldDisableSavebutton =
    categoryName === "" || !selectedExpenseType ? true : false;

  /**
   * function to set category name.
   * @param event - input change event
   */
  const handleCategoryNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryName(event.target.value);
  };

  /**
   * function to handle change
   * for selecting type of expense category.
   * @param event - input[type="radio"] change event.
   */
  const selectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedExpenseType(event.target.value as ExpensesCategoryType);
  };

  /**
   * function to update the expense categories list
   * with added category name and type.
   */
  const saveCategory = () => {
    selectedExpenseType &&
      props.setExpenseCategoriesList([
        ...props.expenseCategoriesList,
        { name: categoryName, type: selectedExpenseType },
      ]);
    props.setSnackbarState({
      isOpened: true,
      status: "success",
      message: "Sucessfully created new category",
    });
    props.setShowAddNewCategoryModel(false);
    resetToDefault();
  };

  /**
   * Function to reset the states to default values
   * either on cancel or on saving the category.
   */
  const resetToDefault = () => {
    setCategoryName("");
    setSelectedExpenseType(null);
  };

  return (
    <div className="add-category">
      <div className="display-flex justify-content-space-between align-items-center">
        <ArrowBackRounded
          fontSize="large"
          className="color-info"
          onClick={() => {
            props.setShowAddNewCategoryModel(false);
            resetToDefault();
          }}
        />
        <h1 className="font-size-larger">Create new category</h1>
      </div>

      <div className="category-name-container">
        <span className="bold">Name</span>
        <TextField
          variant="filled"
          placeholder="Groceries"
          value={categoryName}
          fullWidth
          onChange={handleCategoryNameChange}
          required
          focused
        />
      </div>

      <div className="category-type-container">
        <span className="bold">Expense type</span>
        {expensesTypes.map((type, index) => {
          return (
            <div className="display-flex align-items-center" key={index}>
              <Radio
                checked={selectedExpenseType === type.name}
                value={type.name}
                onChange={selectCategory}
                sx={{ paddingLeft: 0 }}
                color="success"
              />
              <p>
                <span className="bold">{type.name}</span>{" "}
                <span className="color-info font-size-small">({type.eg})</span>
              </p>
            </div>
          );
        })}
      </div>

      <Button
        fullWidth
        variant="contained"
        onClick={saveCategory}
        disabled={shouldDisableSavebutton}
        color="success"
      >
        <span className="bold">Add Category</span>
      </Button>
    </div>
  );
};

export default AddCategory;
