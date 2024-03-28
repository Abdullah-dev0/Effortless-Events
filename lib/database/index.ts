import mongoose from "mongoose";

let cached = (global as any).mongoose || {
   con: null,
   promise: null,
};

export const connectToDatabase = async () => {
   if (cached.con) {
      return cached.con;
   }

   if (!cached.promise) {
      if (!process.env.MONGODB_URI) {
         throw new Error(
            "Please define the MONGODB_URI environment variable inside .env.local"
         );
      }
      cached.promise =
         cached.promise ||
         mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Effortless-Events",
            bufferCommands: false,
         });
   }

   cached.con = await cached.promise;

   return cached.con;
};
