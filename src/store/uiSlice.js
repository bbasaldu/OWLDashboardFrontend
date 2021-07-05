import { createSlice } from "@reduxjs/toolkit";

//add global loading state here

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loading: true,
        theme: {
            primary: null,
            secondary: null,
            tertiary: null
        },
        logoPath: null
    },
    reducers: {
        setTheme(state, action){
            const colors = action.payload.colors
            state.theme = {
                primary: colors.Primary,
                secondary: colors.Secondary,
                tertiary: colors.Tertiary
            }
        },
        setLoading(state, action){
            state.loading = action.payload
        },
        setLogoPath(state, action){
            state.logoPath = action.payload
        }

    }
})
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;