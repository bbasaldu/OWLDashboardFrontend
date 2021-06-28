import { createSlice } from "@reduxjs/toolkit";

//add global loading state here

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loading: false,
        theme: {
            primary: null,
            secondary: null,
            tertiary: null
        }
    },
    reducers: {
        setTheme(state, action){
            const colors = action.payload.colors
            state.theme = {
                primary: colors.Primary,
                secondary: colors.Secondary,
                tertiary: colors.Tertiary
            }
        }
    }
})
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;