import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
  name: "problems",
  initialState: {
    problems: [],
  },
  reducers: {
    setProblems: (state, action) => {
      state.problems = action.payload;
    },

    deleteProblem: (state, action) => {
      state.problems = state.problems.filter(
        (p) => p._id !== action.payload
      );
    },

    updateProblem: (state, action) => {
      const updated = action.payload;

      const index = state.problems.findIndex(
        (p) => p._id === updated._id
      );

      if (index !== -1) {
        state.problems[index] = updated;
      }
    },
  },
});

export const {
  setProblems,
  deleteProblem,
  updateProblem,
} = problemSlice.actions;

export default problemSlice.reducer;