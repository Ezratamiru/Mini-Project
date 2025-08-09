import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_BASE_URL = 'http://localhost:3001'

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, thunkApi) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) throw new Error('Failed to fetch users')
    return await response.json()
  } catch (error) {
    return thunkApi.rejectWithValue(error.message || 'Unknown error')
  }
})

export const fetchUserById = createAsyncThunk('users/fetchById', async (userId, thunkApi) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`)
    if (!response.ok) throw new Error('Failed to fetch user')
    return await response.json()
  } catch (error) {
    return thunkApi.rejectWithValue(error.message || 'Unknown error')
  }
})

export const addUser = createAsyncThunk('users/add', async (newUser, thunkApi) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    if (!response.ok) throw new Error('Failed to add user')
    return await response.json()
  } catch (error) {
    return thunkApi.rejectWithValue(error.message || 'Unknown error')
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    selectedUser: null,
    status: 'idle',
    error: null,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to fetch users'
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedUser = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to fetch user'
      })
      .addCase(addUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list.push(action.payload)
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to add user'
      })
  },
})

export const { setSearchQuery } = usersSlice.actions

export default usersSlice.reducer

