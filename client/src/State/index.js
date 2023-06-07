import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import storage from "redux-persist/lib/storage"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import vendorSlice from "./VendorSlice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    vendor: vendorSlice.reducer
})

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export default store;