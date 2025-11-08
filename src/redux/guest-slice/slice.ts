/* --- Imports --- */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/* --- Slice --- */
const guestSlice = createSlice({
	name: 'guest',
	initialState: {
		isGuest: false,
	},
	reducers: {
		setIsGuest: (state, action: PayloadAction<{ isGuest: boolean }>) => {
			state.isGuest = action.payload.isGuest;
		},
	},
});

/* --- Exports --- */
export const { setIsGuest } = guestSlice.actions;
export default guestSlice;
