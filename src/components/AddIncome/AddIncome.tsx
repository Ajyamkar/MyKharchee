import { CurrencyRupeeRounded } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { saveUserIncome } from "../../api/income";
import ToastContext from "../../hooks/ToastContext";
import CategoriesButtonList from "../CategoriesButtonList/CategoriesButtonList";
import { IncomeCategoriesListType } from "../Types";
import "./AddIncome.scss";

interface AddIncomeProps {
  incomeCategoriesList: Array<IncomeCategoriesListType>;
  closeDrawer: () => void;
  selectedDate: dayjs.Dayjs;
}

/**
 * Component to render Add Income section.
 *
 * @param props.incomeCategoriesList - list of categories of income.
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
   * Function to show toast on success/failure while creating new category.
   */
  const { setToastState } = useContext(ToastContext);

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
    saveUserIncome({
      date: props.selectedDate.toDate(),
      amount: amount ?? 0,
      categoryId: selectedCategoryId,
    })
      .then((response) => {
        setToastState({
          isOpened: true,
          status: "success",
          message: response.data,
        });
      })
      .catch(() => {
        setToastState({
          isOpened: true,
          status: "error",
          message: "something went wrong, try again",
        });
      })
      .finally(() => props.closeDrawer());
  };

  return (
    <div className="add-income mt-1">
      <div className="add-income-options">
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
      </div>

      <div className="add-income-options">
        <h1 className="mb-0">Select the category</h1>
        <CategoriesButtonList
          categoriesList={props.incomeCategoriesList}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          categoryListType="addIncome"
        />
      </div>

      <Button
        className="save-button font-size-large bold mt-1"
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
