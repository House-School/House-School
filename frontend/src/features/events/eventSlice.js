import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventService from './eventService'

const initialState = {
  events: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(eventData)
      return await eventService.createEvent(eventData, token)
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

export const getEvents = createAsyncThunk(
  'events/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await eventService.getEvents(token)
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

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await eventService.deleteEvent(id, token)
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

// Update user event
export const updateEvent = createAsyncThunk(
  'events/update',
  async ({id, eventData}, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.user.token
          return await eventService.updateEvent(id, eventData, token)
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

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events.push(action.payload)
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events = action.payload
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events = state.events.filter(
          (events) => events._id !== action.payload.id
        )
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.events = state.events.map((event) => event._id !== action.payload.id
              ? {
                  ...event,
                  text: action.payload.text
              }
              :  event
          )
      })
      .addCase(updateEvent.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
  },
})

export const { reset } = eventSlice.actions
export default eventSlice.reducer