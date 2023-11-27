import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ToDo = {
  id: number;
  text: string;
  completed: boolean;
}

type AppState = {
  todos: ToDo[];
  exampleData: any;
}

const initialState: AppState = {
  todos: [],
  exampleData: {}
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
    },
    dataLoaded(state, action: PayloadAction<any>) {
      state.exampleData = action.payload;
    }
  }
});

export const { todoAdded, todoToggled, dataLoaded } = appSlice.actions;

export default appSlice;