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
  const month = new Date(selectedDate).toLocaleString("default", {
    month: "long",
  });
  const response = instance({
    method: "GET",
    url: `/api/income/getIncome/${month}`,
    headers: {
      authorization: getUserAuthorizationToken(),
    },
  });
  return response;
};

export { getIncomeCategoriesApi, saveUserIncome, getUserIncome };
