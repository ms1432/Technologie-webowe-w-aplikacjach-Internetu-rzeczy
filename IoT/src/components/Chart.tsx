import * as React from 'react';
import { LineChart } from '@mui/x-charts';

const margin = { right: 24 };

type ChartProps = {
  Temperature?: number[];
  Humidity?: number[];
  Pressure?: number[];
  Data?: string[] 
};

function Chart({Temperature, Humidity, Pressure, Data}: ChartProps) {
  return (
    <LineChart
      sx={{
        width: '40vh',
        '.MuiChartsLegend-root': { color: 'white' },
        '.MuiChartsLegend-label': { color: 'white !important' },
        '.MuiChartsAxis-root line': { stroke: 'white' },
        '.MuiChartsAxis-tickLabel': { fill: 'white' },
        '.MuiChartsAxis-label': { fill: 'white' },
        '.MuiChartsGrid-line': { stroke: 'white'},
      }}
      height={300}
      series={[
        { data: Temperature, label: 'Temperature [C]' },
        { data: Humidity, label: 'Humidity [%]' },
        { data: Pressure, label: 'Pressure x 10 [hPa]' },
      ]}
      xAxis={[{
        scaleType: 'point',
        data: Data,
        tickLabelStyle: { fill: 'white' },
        
      }]}
      yAxis={[{
        width: 50,
        tickLabelStyle: { fill: 'white' }
      }]}
      margin={margin}
      colors={['#db0bfa', '#70cbfa', '#fadb0b']}
      slotProps={{
        legend: {
          labelStyle: { color: 'white', fill: 'white' },
          
        },
      }}
    />
  );
}

export default Chart;