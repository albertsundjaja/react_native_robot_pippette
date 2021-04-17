import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import robotLogic from '../logic/robotLogic';

// init new plate (RESET command)
export const cmdReset = createAsyncThunk("plate/cmdReset", 
    async (size, thunkAPI) => {
        let result = [];
        try {
            result = robotLogic.initWellMatrix(size);
        } catch(ex) {
            return thunkAPI.rejectWithValue(ex.message);
        }
        return result;
    }
)

// send PLACE command
export const cmdPlace = createAsyncThunk("plate/cmdPlace",
    async (coordinate, thunkAPI) => {
        let result = [];
        try {
            result = robotLogic.place(coordinate);
        } catch(ex) {
            return thunkAPI.rejectWithValue(ex.message);
        }

        return result;
    }
)

export const plateSlice = createSlice({
    name: "plate",
    initialState: {
        wellMatrix: [],
        cmdError: false,
        errorMsg: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(cmdReset.pending, (state, action) => {
            state.cmdError = false;
            state.errorMsg = false;
        })
        .addCase(cmdReset.fulfilled, (state, action) => {
            state.wellMatrix = action.payload;
        })
        .addCase(cmdReset.rejected, (state, action) => {
            state.cmdError = true;
            state.errorMsg = action.payload;
        })
        .addCase(cmdPlace.pending, (state, action) => {
            state.cmdError = false;
            state.errorMsg = '';
        })
        .addCase(cmdPlace.fulfilled, (state, action) => {
            state.wellMatrix = action.payload;
        })
        .addCase(cmdPlace.rejected, (state, actions) => {
            state.cmdError = true;
            state.errorMsg = action.payload;
        })
    }
})

export default plateSlice.reducer;