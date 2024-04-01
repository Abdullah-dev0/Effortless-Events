"use client";

import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { eventDefaultValues } from "@/constants";
import { eventFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dropdown } from "./Dropdown";
import { FileUploader } from "./FileUploader";

// types;

type EventFormProps = {
   userId: string;
   type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
   const [file, setFile] = useState<File[]>([]);
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
            <div className="flex flex-col gap-5 md:flex-row">
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormControl>
                           <Textarea
                              placeholder="Event description"
                              {...field}
                              className="textarea h-72"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormControl>
                           <FileUploader
                              onFieldChange={field.onChange}
                              imageUrl={field.value}
                              setFiles={setFile}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex flex-col md:flex-row">
               <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormControl>
                           <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                              <Image
                                 src="/assets/icons/location-grey.svg"
                                 width={24}
                                 height={24}
                                 alt="location"
                              />
                              <Input
                                 placeholder="Event location"
                                 {...field}
                                 className="input-field"
                              />
                           </div>
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
