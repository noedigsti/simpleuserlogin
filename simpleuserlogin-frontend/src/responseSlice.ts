import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ResponseState {
  isLoading: boolean;
  error: string | null;
  data: string | null;
  count: number;
  lastModified: string | null;
}

const initialState: ResponseState = {
  isLoading: false,
  error: null,
  data: null,
  count: 0,
  lastModified: null,
};

export const fetchHelloWorld = createAsyncThunk(
  'response/fetchHelloWorld',
  async () => {
    const response = await fetch('http://localhost:5555/');
    const data = await response.text();
    return data;
  }
);

export const postCounter = createAsyncThunk<
  number,
  void,
  { rejectValue: { message: string } }
>('response/postCounter', async (_, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:5555/counter', {
      method: 'POST',
    });
    const data = await response.json();
    if (!data || !data.count) {
      throw new Error('Invalid response from server');
    }
    const lastModified = data.lastModified ?? null;
    thunkAPI.dispatch(setLastModified(lastModified));
    return data.count;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: (error as Error).message });
  }
});

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.data = null;
      state.count = 0;
      state.lastModified = null;
    },
    setLastModified: (state, action) => {
      state.lastModified = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchHelloWorld =========================================
      .addCase(fetchHelloWorld.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHelloWorld.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchHelloWorld.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      // postCounter =============================================
      .addCase(postCounter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postCounter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(postCounter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload;
      });
  },
});

export const { setLastModified, resetState } = responseSlice.actions;

export default responseSlice.reducer;
