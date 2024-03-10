import { useEffect, useState } from 'react';
import apiService from "../services/apiService"
import { Mafs, Coordinates, Point, Line, useMovablePoint } from "mafs"

const generate_colors = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
};


const MapClients = () => {

    const [data, setData] = useState<Array<any>>([]);
    const [mutex, setMutex] = useState(0);


    const PointWithSegment = ({ index_data }: any) => {
        console.log(index_data, "|", data.length)

        if (index_data + 1 >= data.length) {
            index_data = index_data - 1;
        }

        const point1 = useMovablePoint([data[index_data].x, data[index_data].y]);
        const point2 = useMovablePoint([data[index_data + 1].x, data[index_data + 1].y]);

        return (
            <>
                <Line.Segment 
                    point1={point1.point} 
                    point2={point2.point} 
                    color={generate_colors()}
                />
                {point1.element}
                {point2.element}
            </>
        );
    };

    useEffect(() => {
        apiService.get("/solve-tsp")
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, [mutex]);

    return (
        <Mafs
            viewBox={{
                x: [Math.min(...data.map((v) => v.x)), Math.max(...data.map((v) => v.x))],
                y: [Math.min(...data.map((v) => v.y)), Math.max(...data.map((v) => v.y))]
            }}
            height={1000}
            zoom={true}
        >
            <Coordinates.Cartesian />
            {data.map((point: any, index: any) => (
                <PointWithSegment key={index} index_data={index} />
            ))}
        </Mafs>
    );
};

export default MapClients;
