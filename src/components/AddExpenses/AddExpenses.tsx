/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import "./AddExpenses.scss";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import NotesIcon from "@mui/icons-material/Notes";
import { Add } from "@mui/icons-material";
import { ExpensesCategoriesListType } from "../Types";
import CategoriesButtonList from "../CategoriesButtonList/CategoriesButtonList";
import {
  addUserExpenseApi,
  deleteExpenseCategoryApi,
  getExpenseByIdApi,
  updateExpenseByExpenseIdApi,
} from "../../api/expenses";
import dayjs, { Dayjs } from "dayjs";
import ToastContext from "../../hooks/ToastContext";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import useIntermediateStates from "../../hooks/useIntermediateStates";

interface AddExpensesProps {
  selectedDate: dayjs.Dayjs;
  setShowAddNewCategoryModel: React.Dispatch<React.SetStateAction<boolean>>;
  expenseCategoriesList: Array<ExpensesCategoriesListType>;
  setExpenseCategoriesList: React.Dispatch<
    React.SetStateAction<Array<ExpensesCategoriesListType>>
  >;
  closeDrawer: () => void;
  handleDateChange: (newDate: Dayjs) => void;
}

/**
 * Defines the order of repsective input fields in Add Expenses flow.
 */
const AMOUNT_POSITION_INDEX = 1;
const CATEGORY_BUTTONS_POSITION_INDEX = 2;

/**
 * Component to render Add Expenses section.
 *
 * @param props.expenseCategoriesList - list of categories of expenses.
 * @param props.setShowAddNewCategoryModel- callback function to show/hide this component.
 * @param props.setExpenseCategoriesList - callback function to update list of expenses category.
 * @param props.closeDrawer - callback function to close drawer on successfully adding expense.
 * @param props.selectedDate - selected date to add/update expense.
 * @param props.handleDateChange - callback function to change the date.
 */
const AddExpenses = (props: AddExpensesProps) => {
  /**
   * State to keep track of item name.
   */
  const [itemName, setItemName] = React.useState("");

  /**
   * State to keep track of amount spent on an item.
   */
  const [amount, setAmount] = React.useState<number | null>(null);

  /**
   * State to keep track of selected category id.
   */
  const [selectedCategoryId, setSelectedCategoryId] = React.useState("");

  /**
   * State to keep track to show next input flow.
   */
  const [nextButtonCounter, setNextButtonCounter] = React.useState(0);

  /**
   * State to show error message if any.
   */
  const [errorMessage, setErrorMessage] = React.useState("");

  /**
   * Function to show toast on success/failure of api call.
   */
  const { setToastState } = useContext(ToastContext);

  /**
   * Get expenseId from the url
   */
  const { expenseId } = useParams();

  /**
   * Boolean for showing intermediate state while saving the expense
   */
  const [isSaving, setIsSaving] = React.useState(false);

  /**
   * Hook to manage intermediate states such as isfetching, isSaving etc.
   */
  const { intermediateState, setIntermediateState } = useIntermediateStates();

  /**
   * Updates the states with previously added expense details that were stored in localStorage
   * when the user click's on add new category.
   */
  useEffect(() => {
    if (expenseId) {
      setIntermediateState({ ...intermediateState, isFetching: true });
      getExpenseByIdApi(expenseId)
        .then((response) => {
          const {
            amount: initialAmount,
            date: dateOfExpense,
            itemName: initialItemName,
            category: initialCategory,
          } = response.data;

          props.handleDateChange(dayjs(dateOfExpense));
          setAmount(initialAmount);
          setItemName(initialItemName);

          // category can be a previously deleted category so select only non-deleted category
          initialCategory.categoryName !== "Deleted Category" &&
            setSelectedCategoryId(initialCategory._id);
          setNextButtonCounter(2);
        })
        .catch((err) => {
          setToastState({
            status: "error",
            message: err.response.data,
            isOpened: true,
          });
          setTimeout(() => {
            window.history.back();
          }, 1000);
        })
        .finally(() =>
          setIntermediateState({ ...intermediateState, isFetching: false })
        );
    } else if (localStorage.length) {
      const itemNameLSKey = localStorage.getItem("itemName");
      const amountLSKey = localStorage.getItem("amount");
      const nextButtonCounterLSKey = localStorage.getItem("nextButtonCounter");

      itemNameLSKey && setItemName(itemNameLSKey);
      amountLSKey && setAmount(parseInt(amountLSKey));
      nextButtonCounterLSKey &&
        setNextButtonCounter(parseInt(nextButtonCounterLSKey));
    }
  }, [expenseId]);

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
   *
   * Before showing add-category model, current states(eg: itemName,amount,nextButtonCounter) will be stored
   * in localStorage, so that the user need not to add the previously added expenses details
   * when the user redirects back to this component again on saving new category
   */
  const showNewCategoryModel = (): void => {
    setSelectedCategoryId("");

    localStorage.setItem("itemName", itemName);
    localStorage.setItem("amount", `${amount}`);
    localStorage.setItem("nextButtonCounter", `${nextButtonCounter}`);

    props.setShowAddNewCategoryModel(true);
  };

  /**
   * Function to delete a category,
   * on double clicking category button.
   * @param categoryIdToBeRemoved - id of the category to be deleted
   */
  const removeSelectedCategory = (categoryIdToBeRemoved: string) => {
    setIntermediateState({ ...intermediateState, isDeleting: true });
    deleteExpenseCategoryApi({ expenseCategoryId: categoryIdToBeRemoved })
      .then((response) => {
        props.setExpenseCategoriesList(
          response.data
            .updatedCategoriesList as Array<ExpensesCategoriesListType>
        );
        setToastState({
          isOpened: true,
          status: "success",
          message: response.data.message,
        });
      })
      .catch((error) => {
        setToastState({
          isOpened: true,
          status: "error",
          message: "Something went wrong",
        });
      })
      .finally(() =>
        setIntermediateState({ ...intermediateState, isDeleting: false })
      );
  };

  /**
   * Function to update next button counter to show next input flow.
   * Will show error if any of the fields are empty or update the button counter, OR
   * Will save expenses details and close the drawer.
   */
  const updateButtonCounter = () => {
    let errorText = validateInputFields();

    if (errorText) {
      setErrorMessage(errorText);
    } else {
      setErrorMessage("");
      setNextButtonCounter(nextButtonCounter + 1);
      if (nextButtonCounter >= CATEGORY_BUTTONS_POSITION_INDEX) {
        saveExpenseDetails();
      }
    }
  };

  /**
   * Function to validate inputs on every next button click.
   * @returns errors text if any.
   */
  const validateInputFields = () => {
    let err = "";
    if (!itemName) {
      err = "Please enter item name";
    } else if (!amount && nextButtonCounter >= AMOUNT_POSITION_INDEX) {
      err = `Please enter the amount you spent on ${itemName}`;
    } else if (
      selectedCategoryId === "" &&
      nextButtonCounter >= CATEGORY_BUTTONS_POSITION_INDEX
    ) {
      err = "Please select the category";
    } else if (amount && amount <= 0) {
      err = "Amount should be positive";
    }
    return err;
  };

  /**
   * Function to save edited or new expense.
   */
  const saveExpenseDetails = () => {
    setIsSaving(true);

    let promise: Promise<AxiosResponse<any, any>>;
    if (expenseId) {
      promise = updateExpenseByExpenseIdApi(
        {
          editedData: {
            itemName,
            amount,
            date: props.selectedDate.toDate(),
            categoryId: selectedCategoryId,
          },
        },
        expenseId
      );
    } else {
      promise = addUserExpenseApi({
        date: props.selectedDate.toDate(),
        itemName,
        amount: amount ?? 0,
        categoryId: selectedCategoryId,
      });
    }

    promise
      .then((response) => {
        setToastState({
          isOpened: true,
          status: "success",
          message: response.data,
        });
      })
      .catch((error) => {
        setToastState({
          isOpened: true,
          status: "error",
          message: "Something went wrong",
        });
      })
      .finally(() => {
        setIsSaving(false);
        props.closeDrawer();
      });
  };

  return (
    <div className="addExpenses mt-1">
      {intermediateState.isFetching || intermediateState.isDeleting ? (
        <Box>
          <Skeleton height={100} sx={{ marginTop: -3 }} />
          <Skeleton height={100} sx={{ marginTop: -2 }} />
          <Skeleton height={200} sx={{ marginTop: -5 }} />
          <Skeleton height={100} sx={{ marginTop: -4 }} />
        </Box>
      ) : (
        <>
          <div className="expense-option">
            <h1 className="mb-0">On which item did you spend?</h1>
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
          </div>
          <div
            className={`expense-option ${
              nextButtonCounter < AMOUNT_POSITION_INDEX
                ? "display-none"
                : "display-block"
            }`}
          >
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
          <div
            className={`expense-option ${
              nextButtonCounter < CATEGORY_BUTTONS_POSITION_INDEX
                ? "display-none"
                : "display-block"
            }`}
          >
            <h1 className="mb-0">Select the expenes category</h1>
            <div className="categories-button-group">
              <CategoriesButtonList
                categoriesList={props.expenseCategoriesList}
                selectedCategoryId={selectedCategoryId}
                categoryListType="addExpenses"
                setSelectedCategoryId={setSelectedCategoryId}
                removeSelectedCategory={removeSelectedCategory}
              />
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={showNewCategoryModel}
                className="category-button outlined-button"
              >
                New Category
              </Button>
            </div>
            <FormHelperText className="ml-1">
              Double click to delete category
            </FormHelperText>
          </div>
          <Alert
            className={`pt-0 pb-0 mt-1 align-items-center ${
              errorMessage ? "display-flex" : "display-none"
            }`}
            severity="error"
          >
            {errorMessage}
          </Alert>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={updateButtonCounter}
            className="mt-1 bold font-size-large"
            disabled={isSaving}
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <span>
                {nextButtonCounter >= CATEGORY_BUTTONS_POSITION_INDEX
                  ? "Save"
                  : "Next"}
              </span>
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default AddExpenses;
