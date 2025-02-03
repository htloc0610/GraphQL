import Category from "../models/category.model";

export const CategoryResolvers = {
  Query: {
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false,
      });
      return categories;
    },
    getCategory: async (_: any, args: { id: string }) => {
      const { id } = args;
      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return category;
    },
  },

  Mutation: {
    createCategory: async (
      _: any,
      args: {
        category: {
          name: string;
          description: string;
        };
      }
    ) => {
      const { category } = args;
      const newCategory = new Category(category);
      await newCategory.save();
      return newCategory;
    },
    updateCategory: async (
      _: any,
      args: {
        id: string;
        category: {
          name?: string;
          description?: string;
        };
      }
    ) => {
      const { id, category } = args;
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: category },
        { new: true }
      );
      if (!updatedCategory) {
        return "Category not found";
      }
      return updatedCategory;
    },
    deleteCategory: async (_: any, args: { id: string }) => {
      const { id } = args;
      const category = await Category.findByIdAndUpdate(id, {
        deleted: true,
        deletedAt: new Date(),
      });
      if (!category) {
        return "Category not found";
      }
      return "Category deleted successfully";
    },
  },
};
