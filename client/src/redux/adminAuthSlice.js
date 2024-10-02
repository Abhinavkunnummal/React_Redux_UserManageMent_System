import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('adminToken') ? true : false
}

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        adminLoginSuccess: (state, action) => {
            localStorage.setItem('adminToken', action.payload.token);
            state.isLoggedIn = true;
        },
        logout: (state) => {
            localStorage.removeItem('adminToken');
            state.isLoggedIn = false;
        }
    }
});

export const { adminLoginSuccess, logout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
