import { configureStore } from '@reduxjs/toolkit';
import plateReducer from './plateStore';

export default configureStore({
    reducer: {
        plate: plateReducer
    }
})