/**
 * Logger Middleware for Redux
 * Logs actions and state changes for debugging purposes
 * Only active in development mode
 */

const loggerMiddleware = (store) => (next) => (action) => {
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
        const prevState = store.getState();
        const timestamp = new Date().toLocaleTimeString();

        // Log action being dispatched
        console.group(`%c Action: ${action.type} @ ${timestamp}`, 'color: #4CAF50; font-weight: bold;');
        console.log('%c Previous State:', 'color: #9E9E9E; font-weight: bold;', prevState);
        console.log('%c Action:', 'color: #03A9F4; font-weight: bold;', action);

        // Execute the action
        const result = next(action);

        // Log new state after action
        const nextState = store.getState();
        console.log('%c Next State:', 'color: #4CAF50; font-weight: bold;', nextState);

        // Log state diff if available
        if (prevState.presentation && nextState.presentation) {
            const stateDiff = getStateDiff(prevState.presentation, nextState.presentation);
            if (Object.keys(stateDiff).length > 0) {
                console.log('%c State Changes:', 'color: #FF9800; font-weight: bold;', stateDiff);
            }
        }

        console.groupEnd();

        return result;
    }

    // In production, just pass through
    return next(action);
};

/**
 * Helper function to get differences between two states
 * @param {Object} prevState - Previous state
 * @param {Object} nextState - Next state
 * @returns {Object} - Object containing the differences
 */
const getStateDiff = (prevState, nextState) => {
    const diff = {};

    // Check for changes in each key
    Object.keys(nextState).forEach(key => {
        if (JSON.stringify(prevState[key]) !== JSON.stringify(nextState[key])) {
            diff[key] = {
                from: prevState[key],
                to: nextState[key]
            };
        }
    });

    return diff;
};

/**
 * Enhanced logger with performance tracking
 * Tracks how long each action takes to process
 */
export const performanceLoggerMiddleware = (store) => (next) => (action) => {
    if (process.env.NODE_ENV === 'development') {
        const startTime = performance.now();
        const result = next(action);
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);

        if (duration > 16) { // Log if action takes longer than one frame (16ms)
            console.warn(
                `%c Slow Action: ${action.type} took ${duration}ms`,
                'color: #FF5722; font-weight: bold;'
            );
        }

        return result;
    }

    return next(action);
};

/**
 * Crash reporter middleware
 * Catches errors in reducers and logs them
 */
export const crashReporterMiddleware = (store) => (next) => (action) => {
    try {
        return next(action);
    } catch (err) {
        console.error('%c Reducer Error:', 'color: #F44336; font-weight: bold;');
        console.error('Action:', action);
        console.error('Error:', err);
        console.error('Stack:', err.stack);

        // In production, you might want to send this to an error tracking service
        // e.g., Sentry, LogRocket, etc.

        throw err; // Re-throw to maintain error behavior
    }
};

export default loggerMiddleware;
