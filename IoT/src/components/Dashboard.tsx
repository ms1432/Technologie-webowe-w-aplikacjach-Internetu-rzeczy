import { useState } from 'react'
import { useEffect } from 'react'
import { isExpired } from "react-jwt";

import DataCard from './DataCard'
import Chart from './Chart'

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
            fetch(`http://localhost:3100/api/data/${currentDeviceId}/5`,
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
                        pressure: undefined
                    });
                    setTData(data ? data.map((d: { temperature: any; }) => d.temperature) : []);
                    setHData(data ? data.map((d: { humidity: any; }) => d.humidity) : []);
                    setPData(data ? data.map((d: { pressure: any; }) => d.pressure / 10) : []);
                    setXLabels(data ? data.map((_: any, idx: number) => `Pomiar ${idx + 1}`) : []);
                });
        };


        fetchData();
        const interval = setInterval(fetchData, 1000 * 60 * 1);
        return () => clearInterval(interval);
    }, []);



    function changeCurrentDevice(idx: number) {
        setCurrentDeviceId(idx);
        fetch(`http://localhost:3100/api/data/${idx}/5`,
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
                    pressure: undefined
                });
                setTData(data ? data.map((d: { temperature: any; }) => d.temperature) : []);
                setHData(data ? data.map((d: { humidity: any; }) => d.humidity) : []);
                setPData(data ? data.map((d: { pressure: any; }) => d.pressure / 10) : []);
                setXLabels(data ? data.map((_: any, idx: number) => `Pomiar ${idx + 1}`) : []);
            });
    }

    return (
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
                                const diff = (Math.abs(last.temperature - prev.temperature) / Math.abs(prev.temperature) +
                                    Math.abs(last.humidity - prev.humidity) / Math.abs(prev.humidity) +
                                    Math.abs(last.pressure - prev.pressure) / Math.abs(prev.pressure)) / 3;
                                if (diff > 0.2) isBigDiff = true;
                            }
                        }
                        return (
                            <div
                                key={idx}
                                onClick={() => changeCurrentDevice(idx)}
                                style={{
                                    boxShadow: isBigDiff ? '0 0 16px 4px red' : undefined,
                                    borderRadius: 8,
                                }}
                            >
                                <DataCard
                                    deviceID={idx}
                                    temperature={deviceData[idx][0]?.temperature}
                                    humidity={deviceData[idx][0]?.humidity}
                                    pressure={deviceData[idx][0]?.pressure}
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