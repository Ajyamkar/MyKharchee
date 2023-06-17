import { ArrowBackRounded } from "@mui/icons-material";
import { Button, Radio, TextField } from "@mui/material";
import React from "react";
import "./AddCategory.scss";

interface AddCategoryProps {
  setShowAddNewCategoryModel: React.Dispatch<React.SetStateAction<boolean>>;
  expenseCategoriesList: string[];
  setExpenseCategoriesList: React.Dispatch<React.SetStateAction<string[]>>;
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

const AddCategory = (props: AddCategoryProps) => {
  /**
   * State to keep track of category name.
   */
  const [categoryName, setCategoryName] = React.useState("");

  /**
   * State to keep track of expense category type.
   */
  const [selectedExpenseType, setSelectedExpenseType] = React.useState("");

  /**
   * Add category button will be disabled
   * if one of field(name, type) is empty.
   */
  const shouldDisableSavebutton =
    categoryName === "" || selectedExpenseType === "" ? true : false;

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
    setSelectedExpenseType(event.target.value);
  };

  /**
   * function to update the expense categories list
   * with added category name and type.
   */
  const saveCategory = () => {
    props.setExpenseCategoriesList([
      ...props.expenseCategoriesList,
      categoryName,
    ]);
    props.setShowAddNewCategoryModel(false);
  };

  return (
    <div className="add-category">
      <div className="display-flex justify-content_space-between align-items_center">
        <ArrowBackRounded
          fontSize="large"
          className="color-info"
          onClick={() => props.setShowAddNewCategoryModel(false)}
        />
        <h1 className="font-size_larger">Create new category</h1>
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
            <div className="display-flex align-items_center" key={index}>
              <Radio
                checked={selectedExpenseType === type.name}
                value={type.name}
                onChange={selectCategory}
                sx={{ paddingLeft: 0 }}
                color="success"
              />
              <p>
                <span className="bold">{type.name}</span>{" "}
                <span className="color-info font-size_small">({type.eg})</span>
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
