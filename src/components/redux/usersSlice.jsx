import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    users: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
            return state
        }
    }
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
