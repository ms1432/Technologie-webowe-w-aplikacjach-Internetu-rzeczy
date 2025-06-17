import { LineChart } from '@mui/x-charts';
import type { ChartData } from '../../types/types';

const margin = { right: 24 };

type ChartProps = {
  chartData: ChartData
};

function Chart({ chartData }: ChartProps) {

  const scaledPData = chartData.pData.map(pressure => pressure / 10);

  return (
    <LineChart
      sx={{
        width: '40vh',
        '.MuiChartsLegend-root': { color: 'white' },
        '.MuiChartsLegend-label': { color: 'white !important' },
        '.MuiChartsAxis-root line': { stroke: 'white' },
        '.MuiChartsAxis-tickLabel': { fill: 'white' },
        '.MuiChartsAxis-label': { fill: 'white' },
        '.MuiChartsGrid-line': { stroke: 'white' },
      }}
      height={300}
      series={[
        {
          data: chartData.tData,
          label: 'Temperature [°C]',
          curve: "natural"
        },
        {
          data: chartData.hData,
          label: 'Humidity [%]',
          curve: "natural"
        },
        {
          data: scaledPData,
          label: 'Pressure x 10 [hPa]',
          curve: "natural"
        },
      ]}
      xAxis={[{
        scaleType: 'point',
        data: chartData.xLabels,
        tickLabelStyle: { fill: 'white' },
      }]}
      yAxis={[{
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