import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ToDo = {
  id: number;
  text: string;
  completed: boolean;
}

type AppState = {
  todos: ToDo[];
}

const initialState: AppState = {
  todos: []
}

const appSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<{id: number, text: string}>) {
      const { id, text } = action.payload;
      state.todos.push({
        id,
        text,
        completed: false
      });
    },
    todoToggled(state, action: PayloadAction<{id: number}>) {
      const matchingTodo = state.todos.find(todo => todo.id === action.payload.id);

      if (matchingTodo) {
        matchingTodo.completed = !matchingTodo.completed;
      }
    }
  }
});

export const { todoAdded, todoToggled } = appSlice.actions;

export default appSlice;