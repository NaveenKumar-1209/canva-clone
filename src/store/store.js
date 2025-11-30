import { configureStore } from '@reduxjs/toolkit';
import presentationReducer from './presentationSlice';

export const store = configureStore({
    reducer: {
        presentation: presentationReducer,
    },
});
