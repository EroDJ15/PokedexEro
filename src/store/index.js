import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from "./slices/nameTrainer.slice";


export default configureStore ({
    reducer:  {
        //Aquí van todos mis estados globales (slices)
        nameTrainer
    }
})