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
  const [amount, setAmount] = React.useState<number | null>();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<
    number | null
  >();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const addNewCategory = (): void => {
    setSelectedCategoryIndex(null);
    props.setShowAddNewCategoryModel(true);
  };

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
      <Button startIcon={<Add />} onClick={addNewCategory}>
        New Category
      </Button>
      <FormHelperText>Double click to delete category</FormHelperText>
    </div>
  );
};

export default AddExpenses;
