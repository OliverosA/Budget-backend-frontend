import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedCategory,
  setSelectedCategory,
} from "../store/slices/category/categorySlice";
import useRequest from "./useRequest";

const Category = (props) => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { getCategories } = useRequest();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategoryName = (name) => {
    if (name !== undefined) {
      const result = categories.find((item) => item.name === name);
      if (result !== undefined) {
        dispatch(setSelectedCategory(result));
        return result.name;
      }
    }
    dispatch(clearSelectedCategory());
    return "";
  };

  return (
    <>
      <input
        className={props.className}
        type={"text"}
        name="account_number"
        placeholder="Search category..."
        onChange={(e) => {
          getCategoryName(e.target.value);
        }}
        list="categoriesList"
      />
      <datalist id="categoriesList">
        {Object.entries(categories).length !== 0
          ? categories.map((category) => (
              <option key={category.category} value={category.name}></option>
            ))
          : ""}
      </datalist>
    </>
  );
};

export default Category;
