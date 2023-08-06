import instance from "../instance";
import { getCookie, getUserAuthorizationToken } from "../utils/Cookie";
import {
  addExpenseCategoryDataType,
  addExpenseDataType,
  deleteExpenseCategoryDataType,
} from "./Types";

/**
 * Api call to save an user expense.
 * @param data - data required to save an expense
 */
const addUserExpenseApi = async (data: addExpenseDataType) => {
  const response = await instance({
    url: "/api/expense/addExpense",
    method: "POST",
    headers: {
      authorization: getUserAuthorizationToken(),
    },
    data,
  });
  return response;
};

/**
 * Api call to save the newly created expense category.
 * @param data - data required to save the new expense category
 */
const addExpenseCategoryApi = async (data: addExpenseCategoryDataType) => {
  const token = getCookie("token");
  const response = await instance({
    url: "/api/expense/addExpenseCategory",
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    data,
  });
  return response;
};

/**
 * Api call to get list of expense categories of a user.
 */
const getExpenseCategoriesApi = async () => {
  const token = getCookie("token");
  const response = await instance({
    url: "/api/expense/getUserExpenseCategories",
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

/**
 * Api call to get list of income categories.
 * currently all user's will have a default income categories.
 */
const getIncomeCategoriesApi = async () => {
  const token = getCookie("token");
  const response = await instance({
    url: "/api/income/getDefaultIncomeCategories",
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

/**
 * Api call to delete an expense category of a user.
 */
const deleteExpenseCategoryApi = async (
  data: deleteExpenseCategoryDataType
) => {
  const token = getCookie("token");
  const response = await instance({
    url: "/api/expense/deleteExpenseCategory",
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
    data,
  });
  return response;
};

export {
  addUserExpenseApi,
  addExpenseCategoryApi,
  getExpenseCategoriesApi,
  deleteExpenseCategoryApi,
  getIncomeCategoriesApi,
};
