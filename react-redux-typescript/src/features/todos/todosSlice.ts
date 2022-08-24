import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface TodosState {
    listOfTodos: Array<string>
}

const initialState: TodosState = {
    listOfTodos: ['Have a healthy breakfast']
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            state.listOfTodos.push(action.payload);
        }
    }
});

export const {add} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.listOfTodos;

export default todosSlice.reducer;
