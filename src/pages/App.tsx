import React, { useState } from "react";
import { Chart } from "../components/Chart";
import { data, velocityInFreeFall } from "./data";

import { useAppSelector, useAppDispatch } from '../state/hooks'
import { todoAdded, todoToggled } from '../state/appSlice'
import { loadData } from "../state/side-effects/appThunk";

export function App(props) {
    const [inputText, setInputText] = useState("");
    const [todoId, setTodoId] = useState(0);
    const todos = useAppSelector(s => s.app.todos);
    const stuff = useAppSelector(s => s.app.exampleData);
    const dispatch = useAppDispatch();
    return <div>
        <h1>Welcome to our website!</h1>
        <button>Click me</button>
        <div style={{width: 1000, height: 500}}>
            <Chart
                // line={{data: data, name: "Fibonacci"}}
                line={{data: velocityInFreeFall(), name: "Free Fall"}}
                yAxisLabel="Velocity"
                xAxisLabel="Time"
                xAxisUnits="s"
                yAxisUnits="m/s"
            />
        </div>
        <input value={inputText} onChange={e => {
            setInputText(e.target.value);
            setTodoId(todoId + 1);
        }}/>
        <button onClick={e => {
            dispatch(todoAdded({id: todoId, text: inputText}));
        }}>Try this!</button>
        {todos.map(todo => <li>
            {todo.text} <input type="checkbox" checked={todo.completed} onChange={e => dispatch(todoToggled({id: todo.id}))}/>
        </li>)}
        <button onClick={e => dispatch(loadData("", ""))}>Load data!</button>
        {JSON.stringify(stuff)}
        
    </div>;
}