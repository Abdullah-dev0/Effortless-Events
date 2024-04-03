"use server";

import { CreateEventParams } from "@/types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export const createEvent = async ({
   event,
   userId,
   path,
}: CreateEventParams) => {
   try {
      await connectToDatabase();

      const organizer = await User.findById(userId);

      if (!organizer) throw new Error("Organizer not found");

      const newEvent = await Event.create({
         ...event,
         category: event.categoryId,
         organizer: userId,
      });

      if (!newEvent) throw new Error("Error in creating event");

      revalidatePath(path);

      return JSON.parse(JSON.stringify(newEvent));
   } catch (error) {
      console.log(error);
      handleError(error);
   }
};