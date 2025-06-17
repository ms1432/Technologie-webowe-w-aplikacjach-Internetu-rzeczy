import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Label } from "reactstrap";

type DeviceData = {
    tData: number[];
    hData: number[];
    pData: number[];
    xLabels: string[];
}

type ParsedData = {
    tData: number;
    hData: number;
    pData: number;
    xLabels: string;
}[] | null;

type DeviceDetailsProps = {
    deviceID: number;
    deviceData: DeviceData
    detailsState: (value: number | null) => void;
}

function DeviceDetails({ deviceID, deviceData, detailsState }: DeviceDetailsProps) {

    const [parsedData, setParsedData] = useState<ParsedData | null>();

    function parseData(deviceData: DeviceData) {
        const newData: ParsedData = [];
        for (let i = 0; i < deviceData.xLabels.length; i++) {
        newData.push({
                tData: deviceData.tData[i],
                hData: deviceData.hData[i],
                pData: deviceData.pData[i],
                xLabels: deviceData.xLabels[i]
            })
        }
        setParsedData(newData);
    }

    useEffect(() => {
        console.log(deviceData);
        parseData(deviceData)
    }
        , [])

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
                        <TableCell>Temperature</TableCell>
                        <TableCell>Pressure</TableCell>
                        <TableCell>Humidity</TableCell>
                        <TableCell>Reading Date</TableCell>
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
                            <TableCell>{data.pData}</TableCell>
                            <TableCell>{data.hData}</TableCell>
                            <TableCell>{data.xLabels}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default DeviceDetails;