import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Profile.css";

export default function Profile(props) {
  const calendarToolbar = {
    left: "prev next today",
    center: "title",
    right: "dayGridMonth dayGridWeek dayGridDay"
  }
  return (
    <div className="flex-container2">
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth"
      headerToolbar={calendarToolbar} />
    </div>
  );
}
