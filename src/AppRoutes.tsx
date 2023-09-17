import { BrowserRouter, Route, Routes } from "react-router-dom";
import Analytics from "./routes/Analytics/Analytics";
import Dashboard from "./routes/Dashboard/Dashboard";
import Expenses from "./routes/Expenses/Expenses";
import LandingPage from "./routes/LandingPage/LandingPage";
import Login from "./routes/Authentication/Login/Login";
import PageNotFound from "./routes/PageNotFound/PageNotFound";
import Profile from "./routes/Profile/Profile";
import Signup from "./routes/Authentication/Signup/Signup";
import ForgotPassword from "./routes/Authentication/ForgotPassword/ForgotPassword";
import Layout from "./components/Layout/Layout";
import GoogleOAuthRedirect from "./routes/Authentication/GoogleOAuthRedirect";
import AddIncomeOrExpense from "./routes/AddIncomeOrExpense/AddIncomeOrExpense";
import Income from "./routes/Income/Income";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route
              path={"addExpenses"}
              element={<AddIncomeOrExpense type={"expenses"} />}
            />
          </Route>

          <Route path="expenses" element={<Expenses />}>
            <Route
              path="addExpenses"
              element={<AddIncomeOrExpense type={"expenses"} />}
            />
            <Route
              path="editExpense/:expenseId"
              element={<AddIncomeOrExpense type={"expenses"} />}
            />
          </Route>

          <Route path="income" element={<Income />}>
            <Route
              path="addIncome"
              element={<AddIncomeOrExpense type={"income"} />}
            />
          </Route>

          <Route path="analytics" element={<Analytics />}>
            <Route
              path="addExpenses"
              element={<AddIncomeOrExpense type={"expenses"} />}
            />
          </Route>

          <Route path="profile" element={<Profile />}>
            <Route
              path="addExpenses"
              element={<AddIncomeOrExpense type={"expenses"} />}
            />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/googleRedirect" element={<GoogleOAuthRedirect />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
