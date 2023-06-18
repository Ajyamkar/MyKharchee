import React from "react";
import "./App.scss";
import AddExpensesDrawer from "./components/AddExpensesDrawer/AddExpensesDrawer";
import Navbar from "./components/TopAppBar/Navbar";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <AddExpensesDrawer />
    </div>
  );
}

export default App;
