import { createSlice } from '@reduxjs/toolkit';

const init = {sourceInfo: [], response: [], tables: [], data: [], dataIndex: 0}

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
        },
        infoSetData: (state, action) => {
            state.data = action.payload;
            state.dataIndex = 0;
            return state;
        }
    }
});

export const {infoSetSourceInfo, infoSetResponse, infoSetTables, infoSetData } = sliceInfo.actions;

export default sliceInfo.reducer;