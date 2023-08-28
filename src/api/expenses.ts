import instance from "../instance";
import { getUserAuthorizationToken } from "../utils/Cookie";
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
  const response = await instance({
    url: "/api/expense/addExpenseCategory",
    method: "POST",
    headers: {
      authorization: getUserAuthorizationToken(),
    },
    data,
  });
  return response;
};

/**
 * Api call to get list of expense categories of a user.
 */
const getExpenseCategoriesApi = async () => {
  const response = await instance({
    url: "/api/expense/getUserExpenseCategories",
    method: "GET",
    headers: {
      authorization: getUserAuthorizationToken(),
    },
  });
  return response;
};

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
 * Api call to delete an expense category of a user.
 */
const deleteExpenseCategoryApi = async (
  data: deleteExpenseCategoryDataType
) => {
  const response = await instance({
    url: "/api/expense/deleteExpenseCategory",
    method: "DELETE",
    headers: {
      authorization: getUserAuthorizationToken(),
    },
    data,
  });
  return response;
};

/**
 * Api call to get an expenses list for a selected date
 * @param selectedDate - date
 */
const getExpenseForSelectedDateApi = async (selectedDate: Date) => {
  const response = await instance({
    url: `/api/expense/getUserExpensesForSelectedDate/${selectedDate}`,
    method: "GET",
    headers: {
      authorization: getUserAuthorizationToken(),
    },
  });
  return response;
};

/**
 * Api call to call to get an expense by an expensesId
 * @param expenseId - id of the expense
 */
const getExpenseByIdApi = async (expenseId: string) => {
  const response = await instance({
    url: `/api/expense/getExpenseById/${expenseId}`,
    method: "GET",
    headers: {
      authorization: getUserAuthorizationToken(),
    },
  });
  return response;
};

/**
 * Api call to edit an expense by an expenseId
 * @param data - expense data to be updated.
 * @param expenseId - id of expense to be updated.
 */
const updateExpenseByExpenseIdApi = async (
  data: { editedData: any },
  expenseId: string
) => {
  const response = await instance({
    url: `/api/expense/updateExpenseByExpenseId/${expenseId}`,
    method: "PUT",
    headers: {
      authorization: getUserAuthorizationToken(),
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
  getExpenseForSelectedDateApi,
  getExpenseByIdApi,
  updateExpenseByExpenseIdApi,
};
