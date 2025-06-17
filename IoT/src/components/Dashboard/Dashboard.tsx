import { useState } from 'react'
import { useEffect } from 'react'

import DataCard from '../DataCard/DataCard'
import Chart from '../Chart/Chart'
import { isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

import FormCard from './FormCard';
import DeviceDetails from './DeviceDetails';
import type { ChartData, DeviceData } from '../../types/types';
import { MAX_DEVICES } from '../../types/types';


function Dashboard() {

    const [deviceCount, setDeviceCount] = useState(5)
    const [deviceData, setDeviceData] = useState<DeviceData[][] | undefined>([]);
    const [currentDeviceData, setCurrentDeviceData] = useState<DeviceData>({
        deviceId: undefined,
        temperature: undefined,
        humidity: undefined,
        pressure: undefined
    });
    const [currentDeviceId, setCurrentDeviceId] = useState(2);
    const [chartData, setChartData] = useState<ChartData>({
        tData: [],
        hData: [],
        pData: [],
        xLabels: [],
    });
    const [deviceDetailsID, setDeviceDetailsID] = useState<number | null>(null);

    const MAX_DATA = 10;

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

    async function fetchDataRecords(idx: number, num: number) {
        await fetch(`http://localhost:3100/api/data/${idx}/${num}`, headerOptions)
            .then(response => response.json())
            .then(data => {
                setCurrentDeviceData(data && data.length > 0 ? data[0] : {
                    deviceId: undefined,
                    temperature: undefined,
                    humidity: undefined,
                    pressure: undefined,
                });
                setChartData({
                    tData: data ? data.map((d: { temperature: any }) => d.temperature) : [],
                    hData: data ? data.map((d: { humidity: any }) => d.humidity) : [],
                    pData: data ? data.map((d: { pressure: any }) => d.pressure) : [],
                    xLabels: data ? data.map((d: { readingDate: any }) => parseDate(d.readingDate)) : [],
                    dataId: data ? data.map((d: {_id: any }) => d._id) : []
                });
            });
    }

    function handleDevicesValueChange(value: number) {
        setDeviceCount(value);
    }

    async function handleDetails(idx: number | null) {
        if (idx !== null) {
            await fetchDataRecords(idx, MAX_DATA)
        }
        setDeviceDetailsID(idx);
    }

    function changeCurrentDevice(idx: number) {
        setCurrentDeviceId(idx);
    }

    function parseDate(readingDate: string) {
        const date = new Date(readingDate);
        return date.toLocaleString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit'
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
                                deviceData={currentDeviceData}
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
                            chartData={chartData}
                        />
                        <FormCard onDevicesValueChange={handleDevicesValueChange} />
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
                {deviceDetailsID === null ?
                    Array.isArray(deviceData) && deviceData.length > 0 && (
                        Array.from({ length: deviceCount }).map((_, idx) => {
                            let isBigDiff = false;
                            const deviceArr = deviceData[idx]; 

                            let cardDeviceData: DeviceData; 

                            if (deviceArr && deviceArr.length > 0) {
                                cardDeviceData = deviceArr[0];

                                const prev = deviceArr[1]; 

                                if (cardDeviceData.temperature !== undefined &&
                                    prev?.temperature !== undefined && prev.temperature !== 0 &&
                                    cardDeviceData.humidity !== undefined &&
                                    prev?.humidity !== undefined &&
                                    cardDeviceData.pressure !== undefined &&
                                    prev?.pressure !== undefined) {
                                    const diffTemp = Math.abs(cardDeviceData.temperature - prev.temperature) / Math.abs(prev.temperature);
                                    const diffHum = Math.abs(cardDeviceData.humidity - prev.humidity) / Math.abs(prev.humidity);
                                    const diffPress = Math.abs(cardDeviceData.pressure - prev.pressure) / Math.abs(prev.pressure);
                                    if (diffTemp > 0.2 || diffHum > 0.2 || diffPress > 0.2) isBigDiff = true;
                                }
                            } else {
                                cardDeviceData = {
                                    deviceId: idx 
                                };
                            }
                            return (
                                <div
                                    key={idx}
                                    onClick={() => changeCurrentDevice(idx)}
                                    style={{
                                    }}
                                >
                                    <DataCard
                                        deviceData={cardDeviceData}
                                        backgroundColor={idx === currentDeviceId ? '#0eb4b2' : undefined}
                                        border={isBigDiff ? '5px solid red' : undefined}
                                        details={true}
                                        handleDetails={handleDetails}
                                    />
                                </div>
                            );
                        })
                    )
                    :
                    <DeviceDetails
                        deviceID={deviceDetailsID}
                        deviceData={chartData}
                        detailsState={handleDetails} />
                }
            </div>
        </>

    )
}

export default Dashboard;