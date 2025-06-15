import { LineChart } from '@mui/x-charts';

const margin = { right: 24 };

type ChartProps = {
  Temperature?: number[];
  Humidity?: number[];
  Pressure?: number[];
  Data?: string[]
};

function Chart({ Temperature, Humidity, Pressure, Data }: ChartProps) {
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
          data: Temperature,
          label: 'Temperature [C]',
          curve: "natural"
        },
        {
          data: Humidity,
          label: 'Humidity [%]',
          curve: "natural"
        },
        {
          data: Pressure,
          label: 'Pressure x 10 [hPa]',
          curve: "natural"
        },
      ]}
      xAxis={[{
        scaleType: 'point',
        data: Data,
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