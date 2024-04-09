import { configureStore } from '@reduxjs/toolkit';
import infoReducer from './sliceInfo';

export const store = configureStore({ 
    reducer: {
      info: infoReducer
    }
});

export default store