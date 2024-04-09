import { createSlice } from '@reduxjs/toolkit';

const init = {sourceInfo: [], response: []}

const sliceInfo = createSlice({
    name: 'info',
    initialState: init,
    reducers: {
        infoSetSourceInfo: (state, action) => {
            state.sourceInfo = action.payload;
            return state;
        },
    }
});

export const {infoSetSourceInfo } = sliceInfo.actions;

export default sliceInfo.reducer;