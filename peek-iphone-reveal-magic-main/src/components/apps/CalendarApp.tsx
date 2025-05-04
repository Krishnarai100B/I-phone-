
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";

const CalendarApp: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events] = useState([
    { date: new Date().toDateString(), title: "Meeting", time: "10:00 AM" },
    { date: new Date(new Date().setDate(new Date().getDate() + 1)).toDateString(), title: "Lunch", time: "1:00 PM" },
    { date: new Date(new Date().setDate(new Date().getDate() + 3)).toDateString(), title: "Conference", time: "9:00 AM" },
  ]);

  const todaysEvents = events.filter(event => event.date === date?.toDateString());

  return (
    <div className="calendar-app mt-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="border rounded-lg"
      />

      <div className="mt-4 bg-orange-50 rounded-lg p-3">
        <h3 className="font-medium mb-2">
          {date ? date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : "Select a date"}
        </h3>
        
        {todaysEvents.length > 0 ? (
          <div className="space-y-2">
            {todaysEvents.map((event, index) => (
              <div key={index} className="bg-white p-2 rounded border border-orange-100 flex justify-between">
                <span>{event.title}</span>
                <span className="text-sm text-gray-500">{event.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No events scheduled for this day</p>
        )}

        <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-1.5 text-sm">
          Add Event
        </button>
      </div>
    </div>
  );
};

export default CalendarApp;
