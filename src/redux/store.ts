/* --- Imports --- */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import guestSlice from './guest-slice/slice';
import prevRouteSlice from './prev-route-slice/slice';
import userSlice from './user-slice/slice';

/* --- Store --- */
const rootReducer = combineReducers({
	[guestSlice.name]: guestSlice.reducer,
	[prevRouteSlice.name]: prevRouteSlice.reducer,
	[userSlice.name]: userSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

/* --- Types --- */
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
