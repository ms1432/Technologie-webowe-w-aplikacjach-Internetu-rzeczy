import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Label } from "reactstrap";
import type { ChartData, ParsedData } from "../../types/types";

type DeviceDetailsProps = {
    deviceID: number;
    deviceData: ChartData;
    detailsState: (value: number | null) => void;
}

function DeviceDetails({ deviceID, deviceData, detailsState }: DeviceDetailsProps) {

    const [parsedData, setParsedData] = useState<ParsedData | null>();
    const [isAdmin, setIsAdmin] = useState<Boolean>(false);
    const [deviceDataNew, setDeviceDataNew] = useState<ChartData>(deviceData)

    const GetHeaderOptions = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
        }
    };
    const DeleteHeaderOptions = {
        method: "Delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
        }
    };

    async function fetchLatestData(deviceId: number) {
        await fetch(`http://localhost:3100/api/data/${deviceId}/latest`, GetHeaderOptions)
            .then(response => response.json())
            .then(data => setDeviceDataNew(data))
    }

    async function deleteData(dataId: string) {
        await fetch(`http://localhost:3100/api/data/delete/${dataId}`, DeleteHeaderOptions)
    }

    async function handleDeleteData(id: string | undefined) {
        if (id === undefined) return;
        await deleteData(id);
        await fetchLatestData(deviceID);
    }

    function parseData(deviceData: ChartData) {
        const newData: ParsedData = [];
        for (let i = 0; i < deviceData.xLabels.length; i++) {
            newData.push({
                tData: deviceData.tData[i],
                hData: deviceData.hData[i],
                pData: deviceData.pData[i],
                xLabels: deviceData.xLabels[i],
                dataId: deviceData.dataId?.[i]
            })
        }
        setParsedData(newData);
    }

    useEffect(() => {
        parseData(deviceDataNew);
        const token = localStorage.getItem('token');
        token ? setIsAdmin(JSON.parse(atob(token.split('.')[1])).isAdmin) : setIsAdmin(false);
    }, [])

    // useEffect(() => {
    //     parseData(deviceDataNew);
    // }, [handleDeleteData])

    return (
        <Box sx={{
            display: 'flex',
            justifyItems: 'center',
            flexDirection: 'column',
            gap: '10px',
        }}>
            <Button
                onClick={() => detailsState(null)}
                variant="outlined"
                color="error"
            >
                Powrót
            </Button>
            <Label>Device {deviceID.toString()} details</Label>
            <TableContainer sx={{
                display: 'flex',
                justifyContent: 'center',
                border: 'solid 2px #0eb4b2',
                borderRadius: '10px'
            }}>
                <Table>
                    <TableHead sx={{
                        "& .MuiTableCell-root": { color: "white" },
                    }}>
                        <TableCell>
                            Temperature [°C]
                        </TableCell>
                        <TableCell>
                            Pressure [hPa]
                        </TableCell>
                        <TableCell>
                            Humidity [%]
                        </TableCell>
                        <TableCell>
                            Reading Date
                        </TableCell>
                        {isAdmin ?
                            <TableCell>
                                Usuń dane
                            </TableCell>
                            :
                            null
                        }
                    </TableHead>
                    <TableBody>
                        {parsedData?.map((data, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    "& .MuiTableCell-root": { color: "rgb(255, 255, 255)" },
                                }}
                            >
                                <TableCell>
                                    {data.tData}
                                </TableCell>
                                <TableCell>
                                    {data.pData}
                                </TableCell>
                                <TableCell>
                                    {data.hData}
                                </TableCell>
                                <TableCell>
                                    {data.xLabels}
                                </TableCell>
                                {isAdmin ?
                                    <TableCell>
                                        <Button
                                            color="error"
                                            variant="outlined"
                                            onClick={() => handleDeleteData(data.dataId)}
                                        >
                                            Usuń dane
                                        </Button>
                                    </TableCell>
                                    :
                                    null
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default DeviceDetails;