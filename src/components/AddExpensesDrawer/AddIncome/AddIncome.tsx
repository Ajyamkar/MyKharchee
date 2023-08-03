import { CurrencyRupeeRounded } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
} from "@mui/material";
import React from "react";
import CategoriesButtonList from "../CategoriesButtonList/CategoriesButtonList";
import { IncomeCategoriesListType, SnackbarType } from "../Types";
import "./AddIncome.scss";

interface AddIncomeProps {
  incomeCategoriesList: Array<IncomeCategoriesListType>;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarType>>;
  closeDrawer: () => void;
}

/**
 * Component to render Add Income section.
 *
 * @param props.incomeCategoriesList - list of categories of income.
 * @param props.setSnackbarState - callback function to trigger feedback.
 * @param props.closeDrawer - callback function to close drawer on successfully adding income.
 */
const AddIncome = (props: AddIncomeProps) => {
  /**
   * State to keep track of income amount.
   */
  const [amount, setAmount] = React.useState<number>();

  /**
   * State to keep track of selected income category id.
   */
  const [selectedCategoryId, setSelectedCategoryId] = React.useState("");

  /**
   * Function to update amount spent on an item.
   * @param event - input change event
   */
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  /**
   * Function to save the income details.
   */
  const saveIncomeDetails = () => {
    props.setSnackbarState({
      isOpened: true,
      status: "success",
      message: "Successfully added the income",
    });
    props.closeDrawer();
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
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        categoryListType="addIncome"
      />

      <Button
        className="save-button font-size-large bold"
        variant="contained"
        disabled={!amount || selectedCategoryId === ""}
        fullWidth
        onClick={saveIncomeDetails}
      >
        Save
      </Button>
    </div>
  );
};

export default AddIncome;
