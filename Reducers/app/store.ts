// app/store.ts
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
