import instance from "../instance";
import { getUserAuthorizationToken } from "../utils/Cookie";
import { addIncomeDataType } from "./Types";

/**
 * Api call to get list of income categories.
 * currently all user's will have a default income categories.
 */
const getIncomeCategoriesApi = async () => {
  const response = await instance({
    url: "/api/income/getDefaultIncomeCategories",
    method: "GET",
    headers: {
      authorization: getUserAuthorizationToken(),
    },
  });
  return response;
};

/**
 * Api call to save user income
 * @param data - income related data to save eg: amount, category
 */
const saveUserIncome = async (data: addIncomeDataType) => {
  const response = await instance({
    url: "/api/income/addNewIncome",
    method: "POST",
    headers: {
      authorization: getUserAuthorizationToken(),
    },
    data,
  });
  return response;
};

/**
 * Api call to get user income for selected month
 * @param selectedDate - selected date
 */
const getUserIncome = async (selectedDate: Date) => {
  const date = new Date(selectedDate);
  const month = date.toLocaleString("default", {
    month: "long",
  });
  const year = date.getFullYear();
  const response = instance({
    method: "GET",
    url: `/api/income/getIncome/month/${month}/year/${year}`,
    headers: {
      authorization: getUserAuthorizationToken(),
    },
  });
  return response;
};

/**
 * Api call to delete an income by an incomeId
 * @param selectedId - income id to delete
 */
const deleteIncome = async (selectedId: string) => {
  const response = instance({
    method: "DELETE",
    url: `/api/income/deleteIncome/${selectedId}`,
    headers: {
      authorization: getUserAuthorizationToken(),
    },
  });
  return response;
};

/**
 * Api call for fetching income info from incomeId
 * @param incomeId - income id to get income
 */
const getIncomeById = async (incomeId: string) => {
  const response = instance({
    method: "GET",
    url: `/api/income/getIncome/${incomeId}`,
    headers: {
      authorization: getUserAuthorizationToken(),
    },
  });
  return response;
};

/**
 * Api call for editing income details
 * @param data - income data to be edited.
 * @param incomeId - id of the income to be edited.
 */
const editUserIncome = async (data: addIncomeDataType, incomeId: string) => {
  const response = instance({
    method: "PUT",
    url: `/api/income/editIncome/${incomeId}`,
    headers: {
      authorization: getUserAuthorizationToken(),
    },
    data,
  });
  return response;
};

export {
  getIncomeCategoriesApi,
  saveUserIncome,
  getUserIncome,
  deleteIncome,
  getIncomeById,
  editUserIncome,
};
