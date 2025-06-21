"use client";

import { useEffect, useState } from "react";

const YearProgress = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 1);

  const totalDaysInYear =
    (Number(endOfYear) - Number(startOfYear)) / (1000 * 60 * 60 * 24);
  const daysPassed =
    (Number(currentDate) - Number(startOfYear)) / (1000 * 60 * 60 * 24);

  const progressPercentage = (daysPassed / totalDaysInYear) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  });

  return (
    <div>
      <div
        className={`bg-neutral-800 h-[.0625rem]`}
        style={{
          width: `${progressPercentage}%`,
        }}
      />
      <div className="flex items-center justify-between text-xs text-neutral-500 px-8">
        <span>{`Year: ${Math.round(progressPercentage)}% (${Math.round(
          daysPassed
        )} / ${totalDaysInYear})`}</span>
        <span>{`${currentDate.getDate()}/${
          currentDate.getMonth() + 1
        }/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`}</span>
      </div>
    </div>
  );
};

export { YearProgress };
