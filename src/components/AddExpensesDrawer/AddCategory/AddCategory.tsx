import { ArrowBackRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

interface AddCategoryProps {
  setShowAddNewCategoryModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategory = (props: AddCategoryProps) => {
  return (
    <div className="add-category">
      <div className="display-flex justify-content_space-between align-items_center">
        <IconButton onClick={() => props.setShowAddNewCategoryModel(false)}>
          <ArrowBackRounded />
        </IconButton>
        <h1>Create new category</h1>
      </div>
    </div>
  );
};

export default AddCategory;
