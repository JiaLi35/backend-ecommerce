const Category = require("../models/category");

const getCategories = async () => {
  const categories = await Category.find().sort({ _id: -1 });
  return categories;
};

const getCategory = async (id) => {
  const category = await Category.findById(id);
  return category;
};

const addNewCategory = async (label) => {
  // 3. create new category in mongoDB
  const newCategory = new Category({
    label,
  });
  await newCategory.save();
  // 4. return the category wth the billplz url
  return newCategory;
};

const updateCategory = async (id, label) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      label,
    },
    {
      new: true,
    }
  );
  return updatedCategory;
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  getCategories,
  getCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
