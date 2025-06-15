const fetch = require('node-fetch');

const API_URL = 'http://localhost:3100/api/data';
const DEVICE_IDS = [0, 1, 2, 4, 5, 7, 8, 10, 12, 15, 16];
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODQyZjQ5ODI3YWZlYjUwN2IwNWMxZWQiLCJuYW1lIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlzQWRtaW4iOnRydWUsImFjY2VzcyI6ImF1dGgiLCJpYXQiOjE3NTAwMTM0NTAsImV4cCI6MTc1MDAyNDI1MH0.3onFcSZZwxjMuJZHbbTO5jHzUCoL_qNbgdTJygcX6VA'; 

function generateRandomAir() {
    return [
        { id: 1, value: +(Math.random() * 20 + 10).toFixed(1) },   
        { id: 2, value: Math.round(Math.random() * 50 + 980) },    
        { id: 3, value: Math.round(Math.random() * 40 + 30) }      
    ];
}

async function sendDataForDevice(deviceId) {
    const payload = {
        air: generateRandomAir(),
        readingDate: new Date().toISOString(),
        deviceId
    };
    try {
        const response = await fetch(`${API_URL}/${deviceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(payload)
        });
        const text = await response.text();
        try {
            const res = JSON.parse(text);
            console.log(`Wysłano dane do urządzenia ${deviceId}:`, res);
        } catch {
            console.error(`Odpowiedź nie jest JSON:`, text);
        }
    } catch (err) {
        console.error(`Błąd wysyłania do urządzenia ${deviceId}:`, err.message);
    }
}

function sendAllDevices() {
    DEVICE_IDS.forEach(sendDataForDevice);
}

sendAllDevices();
setInterval(sendAllDevices, 1000 * 60 * 5);