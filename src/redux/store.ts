import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { analyticsSlice } from "./slices/analytics";
import { projectSlice } from "./slices/project";
import { settingsSlice } from "./slices/settings";

const rootReducer = combineReducers({
	Project: projectSlice.reducer,
	Settings: settingsSlice.reducer,
	Analytics: analyticsSlice.reducer,
});

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	whitelist: ["Project", "Settings", "Analytics"], // Keys from combineReducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // prevents crash warnings with persist
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
