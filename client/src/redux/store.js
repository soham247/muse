import { configureStore, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null
    },
    reducers: {
        login: (state, actions) => {
            state.isLoggedIn = true;           
            state.user = actions.payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
})

export const { login, logout } = authSlice.actions

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})
