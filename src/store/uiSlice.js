import { createSlice } from "@reduxjs/toolkit";

//add global loading state here

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        searchFilter: "",
        order: "byPlayer",
        pageFound: true,
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
        setThemeDefault(state, action){
            state.theme = {
                primary: '#fff',
                secondary: 'rgba(230, 230, 230, 0.8)',
                tertiary: '#000'
            }
        },
        setLoading(state, action){
            state.loading = action.payload
        },
        setLogoPath(state, action){
            state.logoPath = action.payload
        },
        setPageFound(state, action){
            state.pageFound = action.payload
        },
        setSearchFilter(state, action){
            state.searchFilter = action.payload
        },
        setOrder(state, action){
            state.order = action.payload
        }

    }
})
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;