import React from "react";
import Card from "@/components/cards/EventCard";

import { events } from "../../../public/data/events";

const EventsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 max-w-screen-xl mx-auto px-2 my-20 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <Card
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
};

export default EventsPage;
