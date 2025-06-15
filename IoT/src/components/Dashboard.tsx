import { useState } from 'react'
import { useEffect } from 'react'

import DataCard from './DataCard'
import Chart from './Chart'
import { isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import { Card, Label } from 'reactstrap';
import FormCard from './FormCard';

type DeviceData = {
    deviceId: number;
    temperature: number;
    humidity: number;
    pressure: number;
};



function Dashboard() {

    const [deviceCount, setDeviceCount] = useState(5)
    const [deviceData, setDeviceData] = useState<DeviceData[][] | undefined>([]);
    const [currentDeviceData, setCurrentDeviceData] = useState<Partial<DeviceData>>({
        deviceId: undefined,
        temperature: undefined,
        humidity: undefined,
        pressure: undefined
    });
    const [currentDeviceId, setCurrentDeviceId] = useState(2);
    const [chartData, setChartData] = useState<{
        tData: number[];
        hData: number[];
        pData: number[];
        xLabels: string[];
    }>({
        tData: [],
        hData: [],
        pData: [],
        xLabels: [],
    });

    const MAX_DEVICES = 17;
    const MAX_DATA = 15;

    const navigate = useNavigate();

    const headerOptions = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
        }
    };

    async function fetchLatestData() {
        const promises = [];
        for (let i = 0; i < MAX_DEVICES; i++) {
            promises.push(
                fetch(`http://localhost:3100/api/data/${i}/2`, headerOptions)
                    .then(response => response.json())
                    .then(data => data)
            );
        }
        const allData = await Promise.all(promises);
        setDeviceData(allData);
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
                setCurrentDeviceData(data && data.length > 0 ? data[0] : {
                    deviceId: undefined,
                    temperature: undefined,
                    humidity: undefined,
                    pressure: undefined,
                    readingDate: undefined
                });
                setChartData({
                    tData: data ? data.map((d: { temperature: any }) => d.temperature) : [],
                    hData: data ? data.map((d: { humidity: any }) => d.humidity) : [],
                    pData: data ? data.map((d: { pressure: any }) => d.pressure / 10) : [],
                    xLabels: data ? data.map((d: { readingDate: any }) => parseDate(d.readingDate)) : [],
                });
            });
    }

    function handleDevicesValueChange(value: number) {
        setDeviceCount(value);
    }

    function changeCurrentDevice(idx: number) {
        setCurrentDeviceId(idx);
    }

    function parseDate(readingDate: string) {
        const date = new Date(readingDate);
        return date.toLocaleString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
        }).replace(',', '');
    }

    useEffect(() => {
        fetchLatestData();
        const interval = setInterval(fetchLatestData, 1000 * 60 * 5);
        return () => clearInterval(interval);

    }, []);


    useEffect(() => {
        fetchDataRecords(currentDeviceId, MAX_DATA); 
    }, [currentDeviceId]);

    useEffect(() => {
        if (isExpired(localStorage.getItem('token') || '')) {
            navigate('/login');
        }
    }, []);

    return (isExpired(localStorage.getItem('token') || '') ?
        <>
            <>Zaloguj się : - D</>
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
                        width: '25%',
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
                        width: '75%',
                        padding: '5vh',
                        gap: "20px"
                    }}>
                        <Chart
                            Temperature={chartData.tData}
                            Humidity={chartData.hData}
                            Pressure={chartData.pData}
                            Data={chartData.xLabels}
                        />
                        <FormCard onDevicesValueChange={handleDevicesValueChange}/>
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60%',
                padding: '5vh',
                gap: '5vh',

            }}>
                {Array.isArray(deviceData) && deviceData.length > 0 && (
                    Array.from({ length: deviceCount }).map((_, idx) => {
                        let isBigDiff = false;
                        const deviceArr = deviceData[idx];
                        const last = deviceArr && deviceArr[0];
                        const prev = deviceArr && deviceArr[1];
                        if (last && prev && prev.temperature !== 0) {
                            const diffTemp = Math.abs(last.temperature - prev.temperature) / Math.abs(prev.temperature);
                            const diffHum = Math.abs(last.humidity - prev.humidity) / Math.abs(prev.humidity);
                            const diffPress = Math.abs(last.pressure - prev.pressure) / Math.abs(prev.pressure);
                            if (diffTemp > 0.2 || diffHum > 0.2 || diffPress > 0.2) isBigDiff = true;
                        }
                        return (
                            <div
                                key={idx}
                                onClick={() => changeCurrentDevice(idx)}
                                style={{
                                }}
                            >
                                <DataCard
                                    deviceID={idx}
                                    temperature={deviceArr && deviceArr[0] ? deviceArr[0].temperature : undefined}
                                    humidity={deviceArr && deviceArr[0] ? deviceArr[0].humidity : undefined}
                                    pressure={deviceArr && deviceArr[0] ? deviceArr[0].pressure : undefined}
                                    backgroundColor={idx === currentDeviceId ? '#0eb4b2' : undefined}
                                    border={isBigDiff ? '5px solid red' : undefined}
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