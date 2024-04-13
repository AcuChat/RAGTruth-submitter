import { createSlice } from '@reduxjs/toolkit';

const init = {sourceInfo: [], response: [], tables: []}

const sliceInfo = createSlice({
    name: 'info',
    initialState: init,
    reducers: {
        infoSetSourceInfo: (state, action) => {
            state.sourceInfo = action.payload;
            return state;
        },
        infoSetResponse: (state, action) => {
            state.response = action.payload;
            return state;
        },
        infoSetTables: (state, action) => {
            state.tables = action.payload;
            return state;
        }
        
    }
});

export const {infoSetSourceInfo, infoSetResponse, infoSetTables } = sliceInfo.actions;

export default sliceInfo.reducer;