// import { Tooltip as ReactTooltip} from 'react-tooltip'
import "./App.css";
import { useState, useEffect } from "react";
import Habbit from "./components/Habbit";
import HabbitsHolder from "./components/HabbitsHolder";
import { useDispatch, useSelector } from "react-redux";
import CurrentHabit from "./components/CurrentHabit";

function App() {
  return (
    <>
    <div className="containerApp">
    
    <div className="habbitHolderContainer">
      <HabbitsHolder />
      
    </div>
    <div className="currentHabitContainer">
      <CurrentHabit />
    </div>
    </div>
    </>
  );
}

export default App;
