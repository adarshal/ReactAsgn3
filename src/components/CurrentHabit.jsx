
import { useDispatch, useSelector } from "react-redux";
import { addDays } from "date-fns";
import { updateHabitDateStatus } from "../redux/habbits";
import moment from 'moment'; 
import { useState } from "react";
const CurrentHabit = () => {
    const dispatch = useDispatch();
  const currentHabit = useSelector((state) => state.currentHabbit);
const id=currentHabit.id;
//   const findDates = () => {
    // const dates = [
    //     addDays(today, -6),
    //   addDays(today, -5),
    //   addDays(today, -4),
    //   addDays(today, -3), // 3 days before
    //   addDays(today, -2),
    //   addDays(today, -1),
    //   today, // Today
    //    // 3 days after
    // ];
    // return dates;
// }  ;
const today = moment(); // Get today's date


  
  const getDay=(ind)=>{
const day = moment().subtract(7-ind, 'days');

// Format the date as needed (e.g., YYYY-MM-DD, "MM/DD/YYYY")
const formattedDate = day.format('YYYY-MM-DD');
// console.log(formattedYesterday)
return formattedDate;
  }
  

  if (!currentHabit) {
    return <p>Select habit to see progress...</p>; //  placeholder message
  }
  const handleClick2 = (id,index, newValue) => {
    dispatch(updateHabitDateStatus({ id,  index, newValue }));
  };

  //
  // Array to track active indices

    const [activeDateIndices, setActiveDateIndices] = useState(
      currentHabit.dates.map(() => 0) // Initialize with -1 for no active button
    );
  
    const handleClick = (index, newValue) => {
      dispatch(updateHabitDateStatus({ id, dateIndex: index, newValue })); // Handle state update using your store
  
      // Update activeDateIndices:
      setActiveDateIndices((prevIndices) => {
        if (prevIndices[index] === newValue) {
          // Unmark the same value: set to -1 (no active)
          return prevIndices.map((i, i2) => (i2 === index ? 0 : i));
        } else {
          // Mark a new value: set to newValue
          return prevIndices.map((i, i2) => (i2 === index ? newValue : i));
        }
      });
    };
  

  const updateActiveIndices = (clickedIndex, activeIndices,newValue) => {
    if (activeIndices.includes(clickedIndex*10+newValue)) {
      // Remove the clicked index as it's already active
      return activeIndices.filter((i) => i !== clickedIndex*10+newValue);
    } else {
      // Add the clicked index as it's newly active
      activeIndices.filter((i) => i !== clickedIndex*10+0);
      activeIndices.filter((i) => i !== clickedIndex*10+1);
      activeIndices.filter((i) => i !== clickedIndex*10+2);
      return [...activeIndices, clickedIndex*10+newValue];
    }
  };

  return (
    <div className="current-habit-container">
      <h2>Current Habit: {currentHabit.task}</h2>
      <div className="habit-details">
        <div className="dates-grid">
          

          {/* Render habit status for each day */}

          {currentHabit.dates.map((dateValue, index) => (
            <div key={index} className={`date-box date-${dateValue}`}>
                {getDay(index)}
            <button
              className={
                activeDateIndices[index] === 0 ? 'active' : ''}
              onClick={() => handleClick(index, 0)} // Set "No Action" state
            >
              No Action
            </button>
            <button
              className={
                activeDateIndices[index] === 1 ? 'active' : ''
              }
              onClick={() => handleClick(index, 1)} // Set "Done" state
            >
              Done
            </button>
            <button
              className={
                activeDateIndices[index] === 2 ? 'active' : ''
              }
              onClick={() => handleClick(index, 2)} // Set "Not Done" state
            >
              Not Done
            </button>
          </div>
            
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default CurrentHabit;
