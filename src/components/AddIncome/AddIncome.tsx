import { CurrencyRupeeRounded } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  editUserIncome,
  getIncomeById,
  saveUserIncome,
} from "../../api/income";
import ToastContext from "../../hooks/ToastContext";
import useIntermediateStates from "../../hooks/useIntermediateStates";
import CategoriesButtonList from "../CategoriesButtonList/CategoriesButtonList";
import { IncomeCategoriesListType } from "../Types";
import "./AddIncome.scss";

interface AddIncomeProps {
  incomeCategoriesList: Array<IncomeCategoriesListType>;
  closeDrawer: () => void;
  selectedDate: dayjs.Dayjs;
  handleDateChange: (newDate: Dayjs) => void;
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
  const [amount, setAmount] = useState<number>();

  /**
   * State to keep track of selected income category id.
   */
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  /**
   * Function to show toast on success/failure while creating new category.
   */
  const { setToastState } = useContext(ToastContext);

  /**
   * Hook to manage intermediate states such as isfetching, isSaving etc.
   */
  const { intermediateState, setIntermediateState } = useIntermediateStates();

  /**
   * Get incomeId from url.
   */
  const { incomeId } = useParams();

  useEffect(() => {
    if (incomeId) {
      getIncomeById(incomeId)
        .then((response) => {
          setAmount(response.data.amount as number);
          setSelectedCategoryId(response.data.source.id);
          props.handleDateChange(dayjs(response.data.date));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [incomeId]);

  /**
   * Function to update amount spent on an item.
   * @param event - input change event
   */
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  /**
   * Function to save new user income or edit income details.
   */
  const saveIncomeDetails = () => {
    setIntermediateState({ ...intermediateState, isSaving: true });

    let promise: Promise<AxiosResponse<any, any>>;
    const data = {
      date: props.selectedDate.toDate(),
      amount: amount ?? 0,
      categoryId: selectedCategoryId,
    };
    if (incomeId) {
      promise = editUserIncome(data, incomeId);
    } else {
      promise = saveUserIncome(data);
    }

    promise
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
      .finally(() => {
        setIntermediateState({ ...intermediateState, isSaving: false });
        props.closeDrawer();
      });
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
        disabled={
          !amount || selectedCategoryId === "" || intermediateState.isSaving
        }
        fullWidth
        onClick={saveIncomeDetails}
      >
        {intermediateState.isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};

export default AddIncome;
