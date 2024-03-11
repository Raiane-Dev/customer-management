import { useEffect, useState } from 'react';
import apiService from "../services/apiService"
import { Mafs, Coordinates, Line, useMovablePoint } from "mafs"

const generate_colors = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
};


const MapClients = () => {
    const [data, setData] = useState<Array<any>>([]);
    const [mutex, setMutex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.get("/solve-tsp")
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [mutex]);

    const PointWithSegment = ({ index_data }: any) => {
        let next_data = index_data + 1;
        if (index_data + 1 >= data.length) {
            (index_data === 0) ? next_data = 0 : next_data = next_data - 1;
        }

        const point1 = useMovablePoint([data[index_data].x, data[index_data].y]);
        const point2 = useMovablePoint([data[next_data].x, data[next_data].y]);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (data.length === 0) {
        return <div>No data available</div>;
    }

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
            {data.map((point: any, index: number) => (
                <PointWithSegment key={index} index_data={index} />
            ))}
        </Mafs>
    );
};

export default MapClients;
