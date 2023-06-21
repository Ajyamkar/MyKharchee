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
   * State to keep track to show next input flow.
   */
  const [nextButtonCounter, setNextButtonCounter] = React.useState(0);

  /**
   * Todo: // Clean up localstorage support once concrete solution for issue
   * mentioned in setlocalStorage description.
   */
  React.useEffect(() => {
    const { expenseItemName, expensesAmount, nextButtonCounter } = localStorage;
    if (expenseItemName && expenseItemName && nextButtonCounter) {
      setItemName(expenseItemName ?? "");
      setAmount(Number(expensesAmount) ?? null);
      setNextButtonCounter(Number(nextButtonCounter));
    }
  }, []);

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
    setlocalStorage();
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
    setlocalStorage();
    props.setExpenseCategoriesList(filteredList);
    props.setSnackbarState({
      isOpened: true,
      status: "success",
      message: "Successfully deleted the category",
    });
  };

  /**
   * Todo: // Clean up localstorage support once concrete solution for below issue.
   *
   * Currently on updating props, this component is getting distroyed
   * due to which the states are reseting to its default value i.e empty.
   * On UI after filling itemName and amount fields and user clicks on adding new category
   * and after user clicks back or successfully creating new category the previously entered
   * data is lost and user need to re-enter the values again.
   *
   * To meticate this issue for time-being whenever the props set callback is called
   * storing the the states values in localstorage &
   * localstorage is cleared when expenses drawer is closed
   */
  const setlocalStorage = () => {
    localStorage.setItem("expenseItemName", itemName);
    localStorage.setItem("expensesAmount", `${amount}`);
    localStorage.setItem("nextButtonCounter", `${nextButtonCounter}`);
  };

  /**
   * Function to update next button counter to show next input flow.
   */
  const updateButtonCounter = () => {
    setNextButtonCounter(nextButtonCounter + 1);
  };

  return (
    <div className="addExpenses">
      <h1 className="mb-0">On which item name did you spend?</h1>
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

      <div className={nextButtonCounter < 1 ? "display-none" : "display-block"}>
        <h1 className="mb-0">How much did you spend?</h1>
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
            Enter the amount you have spent to help us keep track of your
            expenses
          </FormHelperText>
        </FormControl>
      </div>
      <div className={nextButtonCounter < 2 ? "display-none" : "display-block"}>
        <h1>What did you spend on?</h1>
        {props.expenseCategoriesList.map((category, index) => {
          return (
            <Button
              key={index}
              className={`category-button ${
                index === selectedCategoryIndex
                  ? "selected-category-button"
                  : ""
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

      <Button
        fullWidth
        variant="contained"
        color="success"
        onClick={updateButtonCounter}
        className="confirm-btn"
      >
        Next
      </Button>
    </div>
  );
};

export default AddExpenses;
