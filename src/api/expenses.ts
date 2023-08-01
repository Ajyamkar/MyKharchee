import instance from "../instance";
import { getCookie } from "../utils/Cookie";
import {
  addExpenseCategoryDataType,
  deleteExpenseCategoryDataType,
} from "./Types";

/**
 * Api call to save the newly created expense category.
 * @param data - data required to save the new expense category
 */
const addExpenseCategoryApi = async (data: addExpenseCategoryDataType) => {
  const token = getCookie("token");
  const response = await instance({
    url: "/api/addExpenseCategory",
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
    url: "/api/getUserExpenseCategories",
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
    url: "/api/deleteExpenseCategory",
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
    data,
  });
  return response;
};

export {
  addExpenseCategoryApi,
  getExpenseCategoriesApi,
  deleteExpenseCategoryApi,
};
