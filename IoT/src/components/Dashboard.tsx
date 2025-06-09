import { useState } from 'react'
import { useEffect } from 'react'

import DataCard from './DataCard'
import Chart from './Chart'
import { isExpired } from 'react-jwt';

import Button from '@mui/material/Button';

type DeviceData = {
    deviceId: number;
    temperature: number;
    humidity: number;
    pressure: number;
};



function Dashboard() {

    const [deviceCount, setDeviceCount] = useState(5)
    const [deviceData, setDeviceData] = useState<DeviceData[][] | undefined>(undefined);
    const [currentDeviceData, setCurrentDeviceData] = useState<Partial<DeviceData>>({
        deviceId: undefined,
        temperature: undefined,
        humidity: undefined,
        pressure: undefined
    });
    const [currentDeviceId, setCurrentDeviceId] = useState(1);
    const [tData, setTData] = useState([]);
    const [hData, setHData] = useState([]);
    const [pData, setPData] = useState([]);
    const [xLabels, setXLabels] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:3100/api/data/latest',
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const sorted = Array.isArray(data)
                        ? [...data].sort((a, b) => Number(a.deviceId) - Number(b.deviceId))
                        : [];
                    setDeviceData(sorted);
                });
            fetch('http://localhost:3100/api/data/latestwo',
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const sorted = Array.isArray(data)
                        ? [...data].sort((a, b) => Number(a.deviceId) - Number(b.deviceId))
                        : [];
                    setDeviceData(sorted);
                });
            console.log(deviceData);

            fetchDataRecords(currentDeviceId, 5);
        };


        fetchData();
        const interval = setInterval(fetchData, 1000 * 60 * 1);
        return () => clearInterval(interval);
    }, []);

    function changeCurrentDevice(idx: number) {
        setCurrentDeviceId(idx);
        fetchDataRecords(idx, 5);
        console.log(currentDeviceData)
    }

    function fetchDataRecords(idx: number, num: number) {
        fetch(`http://localhost:3100/api/data/${idx}/${num}`,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                setCurrentDeviceData(data && data.length > 0 ? data[data.length - 1] : {
                    deviceId: undefined,
                    temperature: undefined,
                    humidity: undefined,
                    pressure: undefined,
                    readingDate: undefined
                });
                setTData(data ? data.map((d: { temperature: any; }) => d.temperature) : []);
                setHData(data ? data.map((d: { humidity: any; }) => d.humidity) : []);
                setPData(data ? data.map((d: { pressure: any; }) => d.pressure / 10) : []);
                setXLabels(data ? data.map((d: { readingDate: any; }) => parseDate(d.readingDate)) : []);
            });
    }

    function parseDate(readingDate: string) {
        const date = new Date(readingDate);
        return date.toLocaleString('pl-PL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).replace(',', '');
    }

    return ( isExpired(localStorage.getItem('token') || '') ?
        <>
            <h1>Zaloguj się!</h1>
            <Button variant="contained">Zaloguj się</Button>
        </>
        :
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40%',
                width: '100%',
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
                        {currentDeviceData && (
                            <DataCard
                                deviceID={currentDeviceId}
                                temperature={currentDeviceData.temperature}
                                humidity={currentDeviceData.humidity}
                                pressure={currentDeviceData.pressure}
                            />
                        )}
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
                height: '60%',
                WebkitJustifyContent: 'space-between',
                padding: '5vh',
                gap: '5vh',

            }}>
                {Array.isArray(deviceData) && deviceData.length > 0 && (
                    Array.from({ length: deviceCount }).map((_, idx) => {
                        const deviceHistory = deviceData[idx];
                        let isBigDiff = false;
                        if (deviceHistory && deviceHistory.length >= 2) {
                            const last = deviceHistory[0];
                            const prev = deviceHistory[1];
                            if (last && prev && prev.temperature !== 0) {
                                const diffTemp = Math.abs(last.temperature - prev.temperature) / Math.abs(prev.temperature);
                                const diffHum = Math.abs(last.humidity - prev.humidity) / Math.abs(prev.humidity);
                                const diffPress = Math.abs(last.pressure - prev.pressure) / Math.abs(prev.pressure);
                                if (diffTemp > 0.2 || diffHum > 0.2 || diffPress > 0.2) isBigDiff = true;
                            }
                        }
                        return (
                            <div
                                key={idx}
                                onClick={() => changeCurrentDevice(idx)}
                                style={{
                                    boxShadow: isBigDiff ? '0 0 16px 4px red' : undefined,
                                    borderRadius: 8,
                                    background: (idx === currentDeviceId) ? '#0eb4b2' : undefined
                                }}
                            >
                                <DataCard
                                    deviceID={idx}
                                    temperature={deviceData[idx][0]?.temperature}
                                    humidity={deviceData[idx][0]?.humidity}
                                    pressure={deviceData[idx][0]?.pressure}
                                    backgroundColor={idx === currentDeviceId ? '#0eb4b2' : undefined}
                                />
                            </div>
                        );
                    })
                )}
            </div>
        </>  
        
    )
}

export default Dashboard;