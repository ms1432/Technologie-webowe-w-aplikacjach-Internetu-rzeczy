import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Nav } from 'reactstrap'
import { useEffect } from 'react'

import Navbar from './components/Navbar'
import DataCard from './components/DataCard'
import Chart from './components/Chart'

const devicesCount = 5;

const data = [
  { deviceID: '1', temperature: '23', humidity: '65', pressure: '1023' },
  { deviceID: '3', temperature: undefined, humidity: undefined, pressure: undefined },
  { deviceID: '2', temperature: '22', humidity: '60', pressure: '1015' },
  { deviceID: '4', temperature: '21', humidity: '55', pressure: '1018' },
  { deviceID: '5', temperature: undefined, humidity: undefined, pressure: undefined },
]

const tData = [23.5, 25.0];
const pData = [101.325, 104.5];
const hData = [45, 65];
const xLabels = [
  '21:15 2.06.2025',
  '21:20 2.06.2025',
];

function App() {

  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40vh',
          backgroundColor: '#121313',
          WebkitJustifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignContent: 'center',
            width: '100%',
            gap: '2vh',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
            }}>
              <DataCard
                deviceID={'1'}
                temperature={'23'}
                humidity={'65'}
                pressure={'1023'} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              width: '60%',
              padding: '5vh',
            }}>
              <Chart
               Temperature={tData}
               Humidity={hData}
               Pressure={pData}
               Data={xLabels}
              />
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          WebkitJustifyContent: 'space-between',
          padding: '5vh',
          gap: '5vh',

        }}>
          {Array.from({ length: devicesCount }).map((_, idx) => (
            <DataCard
              key={idx}
              deviceID={`${data[idx].deviceID}`}
              temperature={`${data[idx].temperature}`}
              humidity={`${data[idx].humidity}`}
              pressure={`${data[idx].pressure}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
