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
import NotesIcon from "@mui/icons-material/Notes";
import { Add } from "@mui/icons-material";
import { SnackbarType } from "../Types";

interface AddExpensesProps {
  setShowAddNewCategoryModel: React.Dispatch<React.SetStateAction<boolean>>;
  expenseCategoriesList: string[];
  setExpenseCategoriesList: React.Dispatch<React.SetStateAction<string[]>>;
  snackbarState: SnackbarType;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarType>>;
}

const AddExpenses = (props: AddExpensesProps) => {
  /**
   * State to keep track of item name.
   */
  const [itemName, setItemName] = React.useState("");

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
   * Function to update amount spent on an item.
   * @param event - input change event
   */
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  /**
   * Function to update item description.
   * @param event - input change event
   */
  const handleItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  /**
   * Function to show create-new-category model,
   * on clicking add new category button.
   */
  const showNewCategoryModel = (): void => {
    setSelectedCategoryIndex(null);
    props.setShowAddNewCategoryModel(true);
  };

  /**
   * Function to delete a category,
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
    props.setSnackbarState({
      isOpened: true,
      status: "success",
      message: "Successfully deleted the category",
    });
  };

  return (
    <div className="addExpenses">
      <h1 className="mb-0">How much did you spend?</h1>

      <FormControl fullWidth variant="filled">
        <FilledInput
          placeholder="Enter the description.."
          value={itemName}
          startAdornment={
            <InputAdornment className="mt-0" position="start">
              <NotesIcon />
            </InputAdornment>
          }
          onChange={handleItemNameChange}
          className="expense-description-input font-size-large"
        />
      </FormControl>
      <FormControl fullWidth variant="filled">
        <FilledInput
          value={amount || ""}
          startAdornment={
            <InputAdornment className="mt-0" position="start">
              <CurrencyRupeeRoundedIcon />
            </InputAdornment>
          }
          onChange={handleAmountChange}
          type={"number"}
          className="amount-spent-input bold font-size-large"
        />
        <FormHelperText className="amount-helper-text ml-0">
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
