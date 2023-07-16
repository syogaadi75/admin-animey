import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    apiUrl: 'https://streaming-api.vercel.app'
    // apiUrl: 'http://localhost:3000'
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setApiUrl: (state, action) => {
            state.user = action.payload;
        }
    },
});

export const {
    setApiUrl
} = apiSlice.actions;

export default apiSlice.reducer;