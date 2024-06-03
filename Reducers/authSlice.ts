
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any;
    token: string;
}

const initialState: AuthState = {
    user: null,
    token: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = '';
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
