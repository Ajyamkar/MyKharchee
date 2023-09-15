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

export { getIncomeCategoriesApi, saveUserIncome };
