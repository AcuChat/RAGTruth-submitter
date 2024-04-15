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
        },
        infoIncrementDataIndex: (state, action) => {
            if (state.dataIndex < state.data.length - 1) ++state.dataIndex;
            return state;
        },
        infoDecrementDataIndex: (state, action) => {
            if (state.dataIndex > 0) --state.dataIndex;
            return state;
        },
        infoAcuraiSelection: (state, action) => {
            if (action.payload) {
                state.data[state.dataIndex].acuraiSelection = action.payload;
                return state;
            }
        }
        
    }
});

export const {infoSetSourceInfo, infoSetResponse, infoSetTables, infoSetData, infoIncrementDataIndex, infoDecrementDataIndex, infoAcuraiSelection } = sliceInfo.actions;

export default sliceInfo.reducer;