import { configureStore } from "@reduxjs/toolkit"
import authsclice from "./authsclice"
const store = configureStore({
    reducer : {
        auth : authsclice,
    }
})


export default store