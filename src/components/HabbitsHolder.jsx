import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addhabbit, clearHabbits, removeHabbit, showHabbit } from "../redux/habbits";
import purgeStoredState from "redux-persist/es/purgeStoredState";

import Habbit from "./Habbit";
const HabbitsHolder = () => {
  const dispatch = useDispatch();
  const allHabbits = useSelector((state) => state.allHabbits);
  const total = useSelector((state) => state.total);
  //   const habbits=allHabbits;
//   console.log(total, allHabbits);

  // Delete habit handler
  const deleteHandler = (habit) => {
    dispatch(removeHabbit(habit.id || habit.name));
  };
  // for adding habbit
  const addHabitwithDates = async (task) => {
    
    

    let arr = [];
    for (let i = 0; i < 7; i++) {
      arr[i] = 0;
    }

    const id = Date.now().toString();
    const newHabit = {
      task,
      dates: arr,
      id,
    };

    // const stringifiedHabit = JSON.stringify(newHabit);
    console.log(newHabit, typeof newHabit);
    return newHabit;
  };
  const add = async () => {
    if (!newHabbit) {
      return;
    }
    const newHabit = await addHabitwithDates(newHabbit); //{id,newHabbit} //

    dispatch(addhabbit(newHabit));
    setNewHabbit('')
  };

  const clearData = () => {
    // Dispatch an action to trigger entire state deletion
    dispatch(clearHabbits());
    // Clear persisted data
    purgeStoredState({
      storage: localStorage, // Or desired storage engine
    });
  };
  //

  const [newHabbit, setNewHabbit] = useState([]);
  const handleChange = (e) => {
    setNewHabbit(e.target.value);
  };

  // Add new task to list
  const appendNewTask = (e) => {
    if (e.key === "Enter") {
      if (!newHabbit) return;
      add(newHabbit);
    }
  };
const handleClick=(id)=>{
    console.log("gfhgf")
    dispatch(showHabbit(id));
}
  //rendering habits
  const renderHabbits = () => {
    return (
      <ul>
        {allHabbits?.map((habbit) => (
          <Habbit key={habbit.id} habbit={habbit} />
        ))}
      </ul>
    );
  };
  return (
    <div>
      <div className="holder">
        <input
          className="add-task"
          id="add"
          value={newHabbit}
          onChange={handleChange}
          placeholder="Add Task"
          onKeyDown={appendNewTask}
        />
        <button onClick={add}>Add Habbit</button>
        <button onClick={clearData}>Clear All Habbits</button>
      </div>
      <div className="habbits" style={{ margin: "3rem" }}>
        <span id="total-tasks" style={{ margin: "2rem" }}>
          Total Habbits : <span id="counter"> {total} </span>{" "}
        </span>
      </div>
      <ul id="list">
  {allHabbits?.map((habit) => (
    
    <button key={habit.id} onClick={() => handleClick(habit.id)}>
      <li>{habit.task}</li>
    </button>
  ))}
</ul>

    </div>
  );
};

export default HabbitsHolder;
