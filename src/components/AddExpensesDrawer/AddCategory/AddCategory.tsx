import { ArrowBackRounded } from "@mui/icons-material";
import { Button, Radio, TextField } from "@mui/material";
import React from "react";
import "./AddCategory.scss";

interface AddCategoryProps {
  setShowAddNewCategoryModel: React.Dispatch<React.SetStateAction<boolean>>;
  expenseCategoriesList: string[];
  setExpenseCategoriesList: React.Dispatch<React.SetStateAction<string[]>>;
}

const expensesTypes = [
  { name: "Essentails", eg: "Groceries, etc" },
  { name: "Leisure", eg: "Eating out, movie, etc" },
  { name: "Loans", eg: "Home loan, personal loan, etc" },
  { name: "Investments", eg: "Mutual funds, Shares, etc" },
];

const AddCategory = (props: AddCategoryProps) => {
  const [categoryName, setCategoryName] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const shouldDisableSavebutton =
    categoryName === "" || selectedCategory === "" ? true : false;

  const handleCategoryNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryName(event.target.value);
  };

  const selectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const saveCategory = () => {
    props.setExpenseCategoriesList([
      ...props.expenseCategoriesList,
      categoryName,
    ]);
    props.setShowAddNewCategoryModel(false);
  };

  return (
    <div className="add-category">
      <div className="display-flex justify-content_space-between align-items_center">
        <ArrowBackRounded
          fontSize="large"
          className="color-info"
          onClick={() => props.setShowAddNewCategoryModel(false)}
        />
        <h1 className="font-size_larger">Create new category</h1>
      </div>

      <div className="category-name-container">
        <span className="bold">Name</span>
        <TextField
          variant="filled"
          placeholder="Groceries"
          value={categoryName}
          fullWidth
          onChange={handleCategoryNameChange}
          required
          focused
        />
      </div>

      <div className="category-type-container">
        <span className="bold">Expense type</span>
        {expensesTypes.map((type, index) => {
          return (
            <div className="display-flex align-items_center" key={index}>
              <Radio
                checked={selectedCategory === type.name}
                value={type.name}
                onChange={selectCategory}
                sx={{ paddingLeft: 0 }}
                color="success"
              />
              <p>
                <span className="bold">{type.name}</span>{" "}
                <span className="color-info font-size_small">({type.eg})</span>
              </p>
            </div>
          );
        })}
      </div>

      <Button
        fullWidth
        variant="contained"
        onClick={saveCategory}
        disabled={shouldDisableSavebutton}
        color="success"
      >
        <span className="bold">Add Category</span>
      </Button>
    </div>
  );
};

export default AddCategory;
