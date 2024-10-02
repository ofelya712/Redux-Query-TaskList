import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InputTask, IState, ITasks } from "./types";
import axios from "axios";


const initialState: IState = {
    list: []
}

export const getAllTasks = createAsyncThunk("get/tasks", async () => {
    const response = await axios.get("http://localhost:3004/tasks")
    return response.data
})

export const addTask = createAsyncThunk("add/task", async (task: InputTask) => {
    const response = await axios.post("http://localhost:3004/tasks", task)
    return response.data
})

export const updateTask=createAsyncThunk("update/task",async(task:ITasks)=>{
    const response=await axios.patch(`http://localhost:3004/tasks/${task.id}`,task)
    return response.data
})

export const deleteTask=createAsyncThunk("delete/task",async(id:string)=>{
    await axios.delete(`http://localhost:3004/tasks/${id}`)
    return id
})

const TaskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllTasks.fulfilled, (state, action) => {
            state.list = action.payload
        })
        builder.addCase(addTask.fulfilled,(state,action)=>{
            state.list.push(action.payload)
        })
        builder.addCase(updateTask.fulfilled,(state,action)=>{
            state.list.find(e=>e.id=action.payload)
        })
        builder.addCase(deleteTask.fulfilled,(state,action)=>{
            state.list=state.list.filter(task=>task.id!==action.payload)
        })
    }
})

export const reducer = TaskSlice.reducer