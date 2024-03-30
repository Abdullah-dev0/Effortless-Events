import EventForm from "@/components/shared/EventForm";
import { Update } from "next/dist/build/swc";
import React from "react";

const EditEventPage = () => {
   return (
      <div>
         <h1>Edit Event</h1>
         <EventForm userId="1" type="Update" />
      </div>
   );
};

export default EditEventPage;
