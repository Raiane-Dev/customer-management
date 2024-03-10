import { useEffect, useState } from 'react';
import apiService from "../services/apiService"
import { Mafs, Coordinates, Point } from "mafs"

const MapClients = () => {
    const [data, setData] = useState([]);
    const [mutex, setMutex] = useState(0);


    useEffect(() => {
        apiService.get("/clients")
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, [mutex]);

    return (
        <Mafs>
            <Coordinates.Cartesian />
            {data.map((point: any, index: any) => (
            <Point x={point.coordinate.x} y={point.coordinate.y} />
            ))}
        </Mafs>
    );
};

export default MapClients;
