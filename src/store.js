import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dateReducer from "./slices/date"
import taskReducer from "./slices/tasks"
import themeReducer from "./slices/theme"

const rootReducer = combineReducers({
    date: dateReducer,
    tasks: taskReducer,
    theme: themeReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store;