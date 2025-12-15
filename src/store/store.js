import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // adjust path if needed

const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ register slice
  },
});

export default store;
