import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React from "react";
import "./AddExpenses.scss";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { Add } from "@mui/icons-material";

interface AddExpensesProps {
  setShowAddNewCategoryModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExpenses = (props: AddExpensesProps) => {
  const [amount, setAmount] = React.useState<number | null>();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<
    number | null
  >();

  const expenseCategories = [
    "Grocery",
    "Shopping",
    "Electricity Bill",
    "Extra",
  ];

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
  };

  const addNewCategory = (): void => {
    setSelectedCategoryIndex(null);
    props.setShowAddNewCategoryModel(true);
  };

  return (
    <div className="addExpenses">
      <h1>How much did you spend?</h1>

      <FormControl fullWidth focused variant="filled">
        <InputLabel>Amount</InputLabel>
        <FilledInput
          value={amount}
          startAdornment={
            <InputAdornment position="start">
              <CurrencyRupeeRoundedIcon />
            </InputAdornment>
          }
          onChange={handleAmountChange}
          type="number"
        />
        <FormHelperText className="amount-helper-text">
          Enter the amount you have spent to help us keep track of your expenses
        </FormHelperText>
      </FormControl>

      <h1>What did you spend on?</h1>
      {expenseCategories.map((category, index) => {
        return (
          <Button
            key={index}
            className={`category-button ${
              index === selectedCategoryIndex ? "selected-category-button" : ""
            }`}
            onClick={() => {
              setSelectedCategoryIndex(index);
            }}
          >
            {category}
          </Button>
        );
      })}
      <Button startIcon={<Add />} onClick={addNewCategory}>
        New Category
      </Button>
    </div>
  );
};

export default AddExpenses;
