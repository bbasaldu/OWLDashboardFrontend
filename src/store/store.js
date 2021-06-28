import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice.js";
import uiReducer from './uiSlice.js'
const store = configureStore({reducer: {player: playerReducer, ui: uiReducer}})
export default store;