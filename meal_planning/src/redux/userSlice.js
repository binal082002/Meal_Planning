import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // This can store both auth and profile data
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // This should contain both authentication and profile details
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }; // Merge new profile data into existing user object
      }
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateProfile, clearUser } = userSlice.actions;
export default userSlice.reducer;
