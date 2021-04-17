import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import robotLogic from '../logic/robotLogic';

// init new plate (RESET command)
export const cmdReset = createAsyncThunk("plate/cmdReset", 
    async (size, thunkAPI) => {
        let result = [];
        try {
            result = await robotLogic.initWellMatrix(size);
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
            result = await robotLogic.place(coordinate);
        } catch(ex) {
            return thunkAPI.rejectWithValue(ex.message);
        }

        return result;
    }
)

// send MOVE command
export const cmdMove = createAsyncThunk("plate/cmdMove", 
    async (direction, thunkAPI) => {
        let result = [];
        try {
            result = await robotLogic.move(direction);
        } catch (ex) {
            return thunkAPI.rejectWithValue(ex.message);
        }
        return result;
    }
)

// send DROP command
export const cmdDrop = createAsyncThunk("plate/cmdDrop",
    async (_, thunkAPI) => {
        let result = [];
        try {
            result = await robotLogic.drop();
        } catch (ex) {
            return thunkAPI.rejectWithValue(ex.message);
        }
        return result;
    }
)

// send DETECT command
export const cmdDetect = createAsyncThunk("plate/cmdDetect",
    async (_, thunkAPI) => {
        let result = [];
        try {
            result = await robotLogic.detect();
        } catch (ex) {
            return thunkAPI.rejectWithValue(ex.message);
        }
        return result;
    }
)

// send REPORT command
export const cmdReport = createAsyncThunk("plate/cmdReport",
    async (_, thunkAPI) => {
        let result = [];
        try {
            result = await robotLogic.report();
        } catch (ex) {
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
        feedbackMsg: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder
        // RESET
        .addCase(cmdReset.pending, (state, action) => {
            state.cmdError = false;
            state.feedbackMsg = '';
        })
        .addCase(cmdReset.fulfilled, (state, action) => {
            state.wellMatrix = action.payload;
        })
        .addCase(cmdReset.rejected, (state, action) => {
            state.cmdError = true;
            state.feedbackMsg = action.payload;
        })
        // PLACE
        .addCase(cmdPlace.pending, (state, action) => {
            state.cmdError = false;
            state.feedbackMsg = '';
        })
        .addCase(cmdPlace.fulfilled, (state, action) => {
            state.wellMatrix = action.payload;
        })
        .addCase(cmdPlace.rejected, (state, action) => {
            state.cmdError = true;
            state.feedbackMsg = action.payload;
        })
        // MOVE
        .addCase(cmdMove.pending, (state, action) => {
            state.cmdError = false;
            state.feedbackMsg = '';
        })
        .addCase(cmdMove.fulfilled, (state, action) => {
            state.wellMatrix = action.payload;
        })
        .addCase(cmdMove.rejected, (state, action) => {
            state.cmdError = true;
            state.feedbackMsg = action.payload;
        })
        // DROP
        .addCase(cmdDrop.pending, (state, action) => {
            state.cmdError = false;
            state.feedbackMsg = '';
        })
        .addCase(cmdDrop.fulfilled, (state, action) => {
            state.wellMatrix = action.payload;
        })
        .addCase(cmdDrop.rejected, (state, action) => {
            state.cmdError = true;
            state.feedbackMsg = action.payload;
        })
        // DETECT
        .addCase(cmdDetect.pending, (state, action) => {
            state.cmdError = false;
            state.feedbackMsg = '';
        })
        .addCase(cmdDetect.fulfilled, (state, action) => {
            state.feedbackMsg = action.payload;
        })
        .addCase(cmdDetect.rejected, (state, action) => {
            state.cmdError = true;
            state.feedbackMsg = action.payload;
        })
        // REPORT
        .addCase(cmdReport.pending, (state, action) => {
            state.cmdError = false;
            state.feedbackMsg = '';
        })
        .addCase(cmdReport.fulfilled, (state, action) => {
            state.feedbackMsg = action.payload;
        })
        .addCase(cmdReport.rejected, (state, action) => {
            state.cmdError = true;
            state.feedbackMsg = action.payload;
        })
    }
})

export default plateSlice.reducer;