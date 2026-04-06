import { createSlice } from "@reduxjs/toolkit";
import { KEYS } from "../../config/constant";

const initialState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    clearUser: (state) => {
      state.userInfo = null;
      // Web standard cleanup
      localStorage.removeItem(KEYS.USER_INFO);
      console.log("userLoggedout")
    },
  },
});

export const { setUserInfo, clearUser } = userSlice.actions;

export default userSlice.reducer;
