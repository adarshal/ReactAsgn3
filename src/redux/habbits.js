import { createSlice } from "@reduxjs/toolkit";

const habbitSlice = createSlice({
  name: "habbits",
  initialState: {
    allHabbits: [],
    total: 0,
    currentHabbit: "",
  },
  reducers: {
    addhabbit: (state, action) => {
      //   console.log(typeof(action.payload));
      //   console.dir('ppp',state);
      state.total += 1;
      state.allHabbits.push(action.payload);
    },
    removeHabbit: (state, action) => {
      state.allHabbits = state.allHabbits.filter(
        (item) => item.id !== action.payload
      );
    },
    clearHabbits: (state) => {
      state.allHabbits = [];
      state.total = 0;
      state.currentHabbit = "";
    },
    showHabbit: (state, action) => {
      state.currentHabbit = state.allHabbits.find(
        (item) => item.id === action.payload
      );
      console.log(state.currentHabbit);
    },
    updateHabitDateStatus: (state, action) => {
      const habitIndex = state.allHabbits.findIndex(
        (item) => item.id === action.payload.id
      );

      if (habitIndex !== -1) {
        // Use Immer's draft methods to update the nested array:
        state.allHabbits[habitIndex].dates[action.payload.dateIndex] =
          action.payload.newValue;
      }

      return state; // Return the updated state object
    },
  },
});

export const {
  addhabbit,
  removeHabbit,
  clearHabbits,
  showHabbit,
  updateHabitDateStatus,
} = habbitSlice.actions;
export default habbitSlice.reducer;
