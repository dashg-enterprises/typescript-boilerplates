import React from "react";
import { Chart } from "../components/Chart";
import { data } from "./data";

export function App(props) {
    return <div>
        <h1>Welcome to our website!</h1>
        <button>Click me</button>
        <div style={{width: 1000, height: 500}}>
            <Chart data={data}/>
        </div>
        
    </div>;
}