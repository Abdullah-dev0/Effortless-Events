import React from "react";

type EventFormProps = {
   userId: string;
   type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
   return <div>EventForm</div>;
};

export default EventForm;
