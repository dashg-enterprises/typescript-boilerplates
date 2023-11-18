import React from "react";
import { Chart } from "../components/Chart";
import { data, velocityInFreeFall } from "./data";

export function App(props) {
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
        
    </div>;
}