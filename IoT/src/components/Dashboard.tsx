import { useState } from 'react'
import { useEffect } from 'react'
import { isExpired } from "react-jwt";

import DataCard from './DataCard'
import Chart from './Chart'

function Dashboard() {

    const [deviceCount, setDeviceCount] = useState(5)
    const [deviceData, setDeviceData] = useState(null);
    const [currentDeviceData, setCurrentDeviceData] = useState({
        deviceId: '1',
        temperature: '23',
        humidity: '62',
        pressure: '1060'
    });
    const [currentDeviceId, setCurrentDeviceId] = useState(1);
    const [tData, setTData] = useState([25, 23]);
    const [hData, setHData] = useState([65, 62]);
    const [pData, setPData] = useState([1023, 1060]);
    const [xLabels, setXLabels] = useState([1, 2]);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:3100/api/data/latest')
                .then(response => response.json())
                .then(data => {

                    const sorted = Array.isArray(data)
                        ? [...data].sort((a, b) => Number(a.deviceId) - Number(b.deviceId))
                        : [];
                    setDeviceData(sorted);
                });
        };

        const fetchToken = () => {
            fetch("http://localhost:3100/api/posts",
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': ' application/json',
                        'x-auth-token': localStorage.getItem('token')
                    }
                })
        }

        fetchData();
        fetchToken();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);



    function changeCurrentDevice(idx) {
        setCurrentDeviceId(parseInt(idx));
        fetch(`http://localhost:3100/api/data/${idx}/5`)
            .then(response => response.json())
            .then(data => {
                setCurrentDeviceData(data);
                setTData(data ? data.map(d => d.temperature) : []);
                setHData(data ? data.map(d => d.humidity) : []);
                setPData(data ? data.map(d => d.pressure) : []);
                setXLabels(data ? data.map((_, idx) => `Pomiar ${idx + 1}`) : []);
            });
    }

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40vh',
                width: '100vw',
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
                height: '50vh',
                WebkitJustifyContent: 'space-between',
                padding: '5vh',
                gap: '5vh',

            }}>
                {Array.isArray(deviceData) && deviceData.length > 0 && (
                    Array.from({ length: deviceCount }).map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => changeCurrentDevice(idx)}>
                            <DataCard
                                key={idx}
                                deviceID={deviceData[idx]?.deviceId}
                                temperature={deviceData[idx]?.temperature}
                                humidity={deviceData[idx]?.humidity}
                                pressure={deviceData[idx]?.pressure ? (deviceData[idx].pressure / 10) : undefined}
                            />
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Dashboard;