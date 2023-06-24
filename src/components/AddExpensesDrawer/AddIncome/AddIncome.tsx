import { CurrencyRupeeRounded } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
} from "@mui/material";
import React from "react";
import CategoriesButtonList from "../CategoriesButtonList/CategoriesButtonList";
import "./AddIncome.scss";

interface AddIncomeProps {
  incomeCategoriesList: string[];
}

/**
 * Component to render Add Income section.
 *
 * @param props.incomeCategoriesList - list of categories of income.
 */
const AddIncome = (props: AddIncomeProps) => {
  /**
   * State to keep track of income amount.
   */
  const [amount, setAmount] = React.useState<number>();

  /**
   * State to keep track of selected index of income category list.
   */
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    React.useState<number>(-1);

  /**
   * Function to update amount spent on an item.
   * @param event - input change event
   */
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <div className="add-income mt-1">
      <h1 className="mb-0">Amount</h1>
      <FormControl fullWidth variant="filled">
        <FilledInput
          placeholder="Enter the amount"
          value={amount || ""}
          type={"number"}
          startAdornment={
            <InputAdornment className="mt-0" position="start">
              <CurrencyRupeeRounded />
            </InputAdornment>
          }
          onChange={handleAmountChange}
          className="income-amount-input bold font-size-large"
        />
      </FormControl>

      <h1 className="mb-0">Select the category</h1>
      <CategoriesButtonList
        categoriesList={props.incomeCategoriesList}
        selectedCategoryIndex={selectedCategoryIndex}
        setSelectedCategoryIndex={setSelectedCategoryIndex}
        categoryListType="addIncome"
      />

      <Button
        className="save-button font-size-large bold"
        variant="contained"
        disabled={!amount || selectedCategoryIndex === -1 ? true : false}
        fullWidth
      >
        Save
      </Button>
    </div>
  );
};

export default AddIncome;
