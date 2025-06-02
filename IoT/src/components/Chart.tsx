import * as React from 'react';
import { LineChart } from '@mui/x-charts';

const margin = { right: 24 };
const tData = [23.5, 25.0];
const pData = [101.325, 104.5];
const hData = [45, 65];
const xLabels = [
  '21:15 2.06.2025',
  '21:20 2.06.2025',
];

function Chart() {
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
        { data: tData, label: 'Temperature [C]' },
        { data: pData, label: 'Humidity [%]' },
        { data: hData, label: 'Pressure x 10 [hPa]' },
      ]}
      xAxis={[{
        scaleType: 'point',
        data: xLabels,
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