import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage"
// import {persistReducer} from "redux-persist"
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        userId: null
    },
    reducers: {
        login: (state, actions) => {
            state.isLoggedIn = true;           
            state.userId = actions.payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
        }
    }
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const reducer = combineReducers({
    auth: authSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const { login, logout } = authSlice.actions

// export const store = configureStore({
//     reducer: persistedReducer
// })

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});