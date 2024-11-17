// src/features/dashboard/components/DateRangeFilter/index.jsx
import React from "react";

const DateRangeFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => (
  <div className="flex gap-4 mb-6 items-center">
    <div className="mb-1">
      <label htmlFor="startDate" className="block text-sm text-gray-600  pe-2">
        Start Date
      </label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        className="border rounded px-3 py-2"
      />
    </div>
    <div>
      <label
        htmlFor="endDate"
        className="block text-sm text-gray-600 mb-1 pe-3"
      >
        End Date
      </label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        className="border rounded px-3 py-2"
      />
    </div>
  </div>
);

export default DateRangeFilter;
