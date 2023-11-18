import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

export type DataPointProp = {
    x: number,
    y: number,
}

export type LineProps = {
    name: string;
    data: DataPointProp[];
}

export interface ChartProps {
    line: LineProps;
    moreLines?: LineProps[];
    xAxisLabel: string;
    yAxisLabel: string;
    xAxisUnits: string;
    yAxisUnits: string;
}

export function Chart(props: ChartProps) {

    return <ResponsiveContainer width="100%" height="100%">
        <LineChart
            width={500}
            height={300}
            data={props.line.data}
            margin={{
                top: 10,
                right: 10,
                left: 70,
                bottom: 40,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis unit={` ${props.xAxisUnits}`}>
                <Label value={props.xAxisLabel} position="center" dy={20}/>
            </XAxis>
            <YAxis unit={` ${props.yAxisUnits}`}>
                <Label value={props.yAxisLabel} position="center" dx={-50}/>
            </YAxis>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" y={props.yAxisLabel} margin={{left: 50}}/>
            <Line name={props.line.name} type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} data={props.line.data}/>
            {/* {props.moreLines?.map(line => <Line name={line.name} type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} data={line.data}/>)} */}
            
        </LineChart>
    </ResponsiveContainer>
}