/* --- Imports --- */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/* --- Types --- */
type User = { email?: string; name?: string; id?: string };

/* --- User Slice --- */
const userSlice = createSlice({
	name: 'user',
	initialState: {
		email: '',
		name: '',
		id: '',
	},
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			Object.assign(state, action.payload);
		},
	},
});

/* --- Exports --- */
export const { setUser } = userSlice.actions;
export default userSlice;
