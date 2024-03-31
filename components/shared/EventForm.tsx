"use client";

import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventDefaultValues } from "@/constants";
import { eventFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dropdown } from "./Dropdown";

// types;

type EventFormProps = {
   userId: string;
   type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
   const initialValues = eventDefaultValues;
   const form = useForm<z.infer<typeof eventFormSchema>>({
      resolver: zodResolver(eventFormSchema),
      defaultValues: initialValues,
   });

   // 2. Define a submit handler.
   function onSubmit(values: z.infer<typeof eventFormSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
         >
            <div className="flex flex-col gap-5 md:flex-row">
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormControl>
                           <Input
                              placeholder="Event title"
                              {...field}
                              className="input-field"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormControl>
                           <Dropdown
                              onChangeHandler={field.onChange}
                              value={field.value}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <Button type="submit">Submit</Button>
         </form>
      </Form>
   );
};

export default EventForm;
