import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import gradeService from './gradeService'

const initialState = {
  grades: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createGrade = createAsyncThunk(
  'grades/create',
  async (gradeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await gradeService.createGrade(gradeData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getGrades = createAsyncThunk(
  'grades/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await gradeService.getGrades(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteGrade = createAsyncThunk(
  'grades/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await gradeService.deleteGrade(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update user grade
export const updateGrade = createAsyncThunk(
  'grades/update',
  async ({id, gradeData}, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.user.token
          return await gradeService.updateGrade(id, gradeData, token)
      } catch (error) {
          const message =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString()
          return thunkAPI.rejectWithValue(message)
      }
  }
)

export const gradeSlice = createSlice({
  name: 'grade',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGrade.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.grades.push(action.payload)
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGrades.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.grades = action.payload
      })
      .addCase(getGrades.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGrade.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.grades = state.grades.filter(
          (grades) => grades._id !== action.payload.id
        )
      })
      .addCase(deleteGrade.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateGrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.grades = state.grades.map((grade) => grade._id !== action.payload.id
              ? {
                  ...grade,
                  text: action.payload.text
              }
              :  grade
          )
      })
      .addCase(updateGrade.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
  },
})

export const { reset } = gradeSlice.actions
export default gradeSlice.reducer