import React, { useState, useEffect } from 'react';

const DateBox = ({ date }) => {
  const today = new Date();
  const daysDiff = Math.floor((today - new Date(date)) / (1000 * 60 * 60 * 24));

  const boxClasses = () => {
    const classes = ['box'];
    if (daysDiff === 0) {
      classes.push('active');
    } else if (daysDiff > 0) {
      classes.push('past');
    } else {
      classes.push('future');
    }
    return classes.join(' ');
  };

  return <div className={boxClasses()}>{date}</div>;
};

const DateBoxes = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString()); // Initialize with today's date

  useEffect(() => {
    // Adjust selected date if needed (e.g., on mount or state change)
  }, [selectedDate]);

  const dateList = [];
  for (let i = -3; i <= 3; i++) {
    const boxDate = new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + i));
    dateList.push(boxDate.toISOString());
  }

  return (
    <div className="date-boxes">
      {dateList.map((date) => (
        <DateBox key={date} date={date} />
      ))}
    </div>
  );
};

export default DateBoxes;
