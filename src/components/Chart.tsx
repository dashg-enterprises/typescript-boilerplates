import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export type DataPoint = {
    x: number,
    y: number,
}

export interface ChartProps {
    data: DataPoint[];
    xAxisLabel: string;
    yAxisLabel: string;
}

export function Chart(props) {

    return <ResponsiveContainer width="100%" height="100%">
        <LineChart
            width={500}
            height={300}
            data={props.data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" label={props.xAxisLabel}/>
            <YAxis label={props.yAxisLabel}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    </ResponsiveContainer>
}