"use server";

import {
   CheckoutOrderParams,
   CreateOrderParams,
   GetOrdersByEventParams,
   GetOrdersByUserParams,
} from "@/types";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import Order from "../database/models/order.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

   const price = order.isFree ? 0 : Number(order.price) * 100;

   try {
      const session = await stripe.checkout.sessions.create({
         line_items: [
            {
               price_data: {
                  currency: "usd",
                  unit_amount: price,
                  product_data: {
                     name: order.eventTitle,
                  },
               },
               quantity: 1,
            },
         ],
         metadata: {
            eventId: order.eventId,
            buyerId: order.buyerId,
         },
         mode: "payment",
         success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
         cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });
      redirect(session.url!);
   } catch (error) {
      throw error;
   }
};

export const createOrder = async (order: CreateOrderParams) => {
   try {
      await connectToDatabase();

      const newOrder = await Order.create({
         ...order,
         event: order.eventId,
         buyer: order.buyerId,
      });

      return JSON.parse(JSON.stringify(newOrder));
   } catch (error) {
      handleError(error);
   }
};

// GET ORDERS BY EVENT
export async function getOrdersByEvent({ eventId }: GetOrdersByEventParams) {
   try {
      await connectToDatabase();

      if (!eventId) throw new Error("Event ID is required");
      const eventObjectId = new ObjectId(eventId);

      const orders = await Order.aggregate([
         {
            $match: {
               event: eventObjectId,
            },
         },
         {
            $lookup: {
               from: "users",
               localField: "buyer",
               foreignField: "_id",
               as: "buyer",
            },
         },
         {
            $lookup: {
               from: "events",
               localField: "event",
               foreignField: "_id",
               as: "event",
            },
         },
         {
            $addFields: {
               buyer: {
                  $arrayElemAt: ["$buyer", 0],
               },
               event: {
                  $arrayElemAt: ["$event", 0],
               },
            },
         },
         {
            $project: {
               _id: 1,
               eventTitle: "$event.title",
               firstName: "$buyer.firstName",
               buyer: "$buyer.username",
               totalAmount: "$event.price",
               createdAt: "$event.createdAt",
            },
         },
      ]);

      return JSON.parse(JSON.stringify(orders));
   } catch (error) {
      handleError(error);
   }
}

// GET ORDERS BY USER
export async function getOrdersByUser({
   userId,
   limit = 3,
   page,
}: GetOrdersByUserParams) {
   try {
      await connectToDatabase();

      const skipAmount = (Number(page) - 1) * limit;
      const conditions = { buyer: userId };

      const orders = await Order.distinct("event._id")
         .find(conditions)
         .sort({ createdAt: "desc" })
         .skip(skipAmount)
         .limit(limit)
         .populate({
            path: "event",
            model: Event,
            populate: {
               path: "organizer",
               model: User,
               select: "_id firstName lastName",
            },
         });

      const ordersCount = await Order.distinct("event._id").countDocuments(
         conditions
      );

      return {
         data: JSON.parse(JSON.stringify(orders)),
         totalPages: Math.ceil(ordersCount / limit),
      };
   } catch (error) {
      handleError(error);
   }
}
