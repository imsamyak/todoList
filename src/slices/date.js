import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
today.setHours(0,0,0,0);
const initialState = {
    displayMonth: today.getMonth(),
    displayYear: today.getFullYear(),
    today: today.toDateString(),
}


const dateSlice = createSlice({
    name:"date",
    initialState,
    reducers: {
        setDate(state,action){
            const {month, year} = action.payload;

            if(year && (isNaN(year) || year<1900 || year>9999)) return;
            if(month && (isNaN(month) || month<0 || month>11)) return;

            
            state.displayMonth = month!==undefined?month:state.displayMonth;
            state.displayYear = year?year:state.displayYear;
        },

        selectDate(state,action){

            if(!action.payload) state.selected = undefined;

            state.selected = action.payload;

        }
    },
})

export const {setDate, selectDate} = dateSlice.actions;
export default dateSlice.reducer; 