"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@heroui/calendar";

const CalendarComponent = () => {
  const [visibleMonths, setVisibleMonths] = useState(1); 

  useEffect(() => {
    const updateVisibleMonths = () => {
      setVisibleMonths(window.innerWidth > 1200 ? 3 : 2);
    };

    updateVisibleMonths(); 
    window.addEventListener("resize", updateVisibleMonths); 

    return () => window.removeEventListener("resize", updateVisibleMonths); 
  }, []);

  return (
    <div className={`flex gap-x-4 ${visibleMonths == 1 ? "mx-auto" : ""}`}>
      <Calendar aria-label="Date (Visible Month)" visibleMonths={visibleMonths} />
    </div>
  );
};

export default CalendarComponent;
