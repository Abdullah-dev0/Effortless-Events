"use server";

import { revalidatePath } from "next/cache";
import { CreateEventParams } from "../../types";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

const populateEvent = (query: any) => {
   return query
      .populate({
         path: "organizer",
         model: User,
         select: "_id firstName lastName",
      })
      .populate({ path: "category", model: Category, select: "_id name" });
};

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

export const getEventById = async (id: string) => {
   try {
      await connectToDatabase();

      const event = await populateEvent(Event.findById(id));
      if (!event) throw new Error("Event not found");

      return JSON.parse(JSON.stringify(event));
   } catch (error) {
      console.log("Error in getevntbyid", error);
   }
};
