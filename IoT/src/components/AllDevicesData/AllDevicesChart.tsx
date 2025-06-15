import { useState, useEffect } from 'react';
import Chart from '../Chart/Chart'
import { isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

function AllDevicesChart() {
    const [allDevicesData, setAllDevicesData] = useState<any[]>([]);
    const deviceCount = 17;

    const navigate = useNavigate();

    const headerOptions = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
        }
    };

    async function fetchLastHourData() {
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 1000 * 60 * 60);

        const promises = [];
        for (let i = 0; i < deviceCount; i++) {
            promises.push(
                fetch(`http://localhost:3100/api/data/${i}/20`, headerOptions)
                    .then(response => response.json())
                    .then(data => {
                        return Array.isArray(data)
                            ? data.filter(d => {
                                const date = new Date(d.readingDate);
                                return date >= oneHourAgo && date <= now;
                            })
                            : [];
                    })
            );
        }
        const allData = await Promise.all(promises);
        setAllDevicesData(allData);
        console.log(allDevicesData)
    }

    useEffect(() => {
        fetchLastHourData();
    }, []);

    useEffect(() => {
        if (isExpired(localStorage.getItem('token') || '')) {
            navigate('/login');
        }
    }, []);

    const flatData = allDevicesData.flat();
    const Temperature = flatData.map((d: any) => d.temperature);
    const Humidity = flatData.map((d: any) => d.humidity);
    const Pressure = flatData.map((d: any) => d.pressure / 10);
    const Data = flatData.map((d: any) =>
        new Date(d.readingDate).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
    );

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
                height: '60vh',
                width: '100%',
                backgroundColor: '#121313',
                WebkitJustifyContent: 'space-between'
            }}>
                <Chart
                    Temperature={Temperature}
                    Humidity={Humidity}
                    Pressure={Pressure}
                    Data={Data}
                />
            </div>
        </>
    )
}

export default AllDevicesChart;