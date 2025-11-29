/* --- Imports --- */
import { createSlice } from '@reduxjs/toolkit';

/* --- Slice --- */
const accessSlices = createSlice({
	name: 'accessSlice',
	initialState: {
		accessToken: null,
	},
	reducers: {
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
		},
	},
});

/* --- Exports --- */
export const { setAccessToken } = accessSlices.actions;
export default accessSlices;
