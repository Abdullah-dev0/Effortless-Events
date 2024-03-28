"use server";

import { CreateUserParams } from "@/types";
import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";

const createUser = async (user: CreateUserParams) => {
   try {
      await connectToDatabase();
      const newUser = await User.create(user);

      return JSON.parse(JSON.stringify(newUser));
   } catch (error) {
      handleError(error);
   }
};

const updateUser = async (clerkId: string, user: CreateUserParams) => {
   try {
      await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
       { clerkId },
       {
          $set: {
             clerkId: user.clerkId,
             email: user.email,
             username: user.username,
             firstName: user.firstName,
             lastName: user.lastName,
             photo: user.photo,
          },
       },
       { new: true }
    );

      return JSON.parse(JSON.stringify(updatedUser));
   } catch (error) {
      handleError(error);
   }
};

const deleteUser = async (clerkId: string) => {
   try {
      await connectToDatabase();
      const deletedUser = await User.findOneAndDelete({ clerkId });

      return JSON.parse(JSON.stringify(deletedUser));
   } catch (error) {
      handleError(error);
   }
};

export { createUser, updateUser, deleteUser };
