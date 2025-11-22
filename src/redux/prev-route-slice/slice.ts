/* --- Imports --- */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/* --- Types --- */
type State = {
	previous: string | null;
};

/* --- Initial State --- */
const initialState: State = {
	previous: null,
};

/* --- Slice --- */
const prevRouteSlice = createSlice({
	name: 'prevRoute',
	initialState,
	reducers: {
		setPrevRoute: (state, action: PayloadAction<string>) => {
			state.previous = action.payload;
		},
	},
});

/* --- Exports --- */
export const { setPrevRoute } = prevRouteSlice.actions;
export default prevRouteSlice;
