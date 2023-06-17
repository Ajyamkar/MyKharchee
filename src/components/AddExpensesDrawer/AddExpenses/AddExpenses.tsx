import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import React from "react";
import "./AddExpenses.scss";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { Add } from "@mui/icons-material";

interface AddExpensesProps {
  setShowAddNewCategoryModel: React.Dispatch<React.SetStateAction<boolean>>;
  expenseCategoriesList: string[];
  setExpenseCategoriesList: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddExpenses = (props: AddExpensesProps) => {
  /**
   * State to keep track of amount spent on an item.
   */
  const [amount, setAmount] = React.useState<number | null>();

  /**
   * State to keep track of selected category index.
   */
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<
    number | null
  >();

  /**
   * function to update amount spent on an item.
   * @param event - input change event
   */
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  /**
   * function to show create-new-category model,
   * on clicking add new category button.
   */
  const showNewCategoryModel = (): void => {
    setSelectedCategoryIndex(null);
    props.setShowAddNewCategoryModel(true);
  };

  /**
   * function to delete a category,
   * on double clicking category button.
   * @param categoryIndexToBeRemoved - index of the category to be deleted
   */
  const removeSelectedCategory = (categoryIndexToBeRemoved: number): void => {
    const filteredList = props.expenseCategoriesList.filter(
      (category, index) => {
        return index !== categoryIndexToBeRemoved;
      }
    );
    props.setExpenseCategoriesList(filteredList);
  };

  return (
    <div className="addExpenses">
      <h1>How much did you spend?</h1>

      <FormControl fullWidth focused variant="filled">
        <FilledInput
          value={amount || ""}
          startAdornment={
            <InputAdornment className="rupee-icon" position="start">
              <CurrencyRupeeRoundedIcon />
            </InputAdornment>
          }
          onChange={handleAmountChange}
          type={"number"}
        />
        <FormHelperText className="amount-helper-text">
          Enter the amount you have spent to help us keep track of your expenses
        </FormHelperText>
      </FormControl>

      <h1>What did you spend on?</h1>
      {props.expenseCategoriesList.map((category, index) => {
        return (
          <Button
            key={index}
            className={`category-button ${
              index === selectedCategoryIndex ? "selected-category-button" : ""
            }`}
            onClick={() => {
              setSelectedCategoryIndex(index);
            }}
            onDoubleClick={() => removeSelectedCategory(index)}
          >
            {category}
          </Button>
        );
      })}
      <Button startIcon={<Add />} onClick={showNewCategoryModel}>
        New Category
      </Button>
      <FormHelperText>Double click to delete category</FormHelperText>
    </div>
  );
};

export default AddExpenses;
