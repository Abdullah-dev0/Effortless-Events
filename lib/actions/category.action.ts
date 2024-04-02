"use server";

import { CreateCategoryParams } from "@/types";
import Category from "../database/models/category.model";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";

export const createCategory = async ({
   categoryName,
}: CreateCategoryParams) => {
   try {
      await connectToDatabase();
      const newCategory = await Category.create({
         name: categoryName,
      });
      if (!newCategory) throw new Error("Error in creating category");
      return JSON.parse(JSON.stringify(newCategory));
   } catch (error) {
      handleError(error);
   }
};

export const getAllCategories = async () => {
   try {
      await connectToDatabase();
      const categories = await Category.find();
      return JSON.parse(JSON.stringify(categories));
   } catch (error) {
      handleError(error);
   }
};
