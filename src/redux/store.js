import {
    configureStore
} from '@reduxjs/toolkit';

import sidebarReducer from './features/sidebarSlice';
import userSlice from './features/userSlice';
import apiSlice from './features/apiSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        user: userSlice,
        api: apiSlice
    }
});