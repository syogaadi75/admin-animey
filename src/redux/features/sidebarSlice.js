import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    active: 'Dashboard',
    hamburger: false,
    hamburgerActive: '',
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            state.active = action.payload.activeMenu;
        },
        setHamburger: (state, action) => {
            state.hamburger = action.payload.hamburger;
        },
        setHamburgerActive: (state, action) => {
            state.hamburgerActive = action.payload.hamburgerActive;
        },
    },
});

export const {
    setActiveMenu,
    setHamburger,
    setHamburgerActive
} = sidebarSlice.actions;

export default sidebarSlice.reducer;