import { configureStore } from '@reduxjs/toolkit';
import presentationReducer from './presentationSlice';
import loggerMiddleware, { performanceLoggerMiddleware, crashReporterMiddleware } from './loggerMiddleware';

export const store = configureStore({
    reducer: {
        presentation: presentationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            crashReporterMiddleware,
            loggerMiddleware,
            performanceLoggerMiddleware
        ),
});
