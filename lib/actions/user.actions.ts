"use server";

import User from "@/lib/database/models/user.model";
import { CreateUserParams, UpdateUserParams } from "@/types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import Order from "../database/models/order.model";
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

const getUserByid = async (clerkId: string) => {
   try {
      await connectToDatabase();

      const user = await User.findById(clerkId);

      return JSON.parse(JSON.stringify(user));
   } catch (error) {
      handleError(error);
   }
};

const updateUser = async (clerkId: string, user: UpdateUserParams) => {
   try {
      await connectToDatabase();
      const updatedUser = await User.findOneAndUpdate(
         { clerkId },
         {
            $set: {
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

      // Find user to delete
      const userToDelete = await User.findOne({ clerkId });

      if (!userToDelete) {
         throw new Error("User not found");
      }

      // Unlink relationships
      await Promise.all([
         // Update the 'events' collection to remove references to the user
         Event.updateMany(
            { _id: { $in: userToDelete.events } },
            { $pull: { organizer: userToDelete._id } }
         ),

         // Update the 'orders' collection to remove references to the user
         Order.updateMany(
            { _id: { $in: userToDelete.orders } },
            { $unset: { buyer: 1 } }
         ),
      ]);

      // Delete user
      const deletedUser = await User.findByIdAndDelete(userToDelete._id);
      revalidatePath("/");
   } catch (error) {
      handleError(error);
   }
};

export { createUser, deleteUser, getUserByid, updateUser };
