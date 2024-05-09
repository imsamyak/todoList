import {createSlice} from '@reduxjs/toolkit'

const themeSlice = createSlice({
    name: "Theme",
    initialState: {isDark: true},
    reducers: {
        toggleTheme(state, action){
            state.isDark = !state.isDark;
        }
    }
})

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;