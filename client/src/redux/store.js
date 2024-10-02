import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer  from "./userAuthSlice.js";
import adminAuthReducer from './adminAuthSlice.js'

const store = configureStore({
    reducer:{
        userAuth : userAuthReducer,
        adminAuth: adminAuthReducer
    }
})

export default store;