interface Coordinates {
    x: number;
    y: number;
}

function calculate_distance(coord1: Coordinates, coord2: Coordinates): number {
    const delta_x = coord1.x - coord2.x;
    const delta_y = coord1.y - coord2.y;
    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

function find_nearest_neighbor(current: Coordinates, unvisited: Coordinates[]): Coordinates | undefined {
    let best_distance = Number.MAX_VALUE;
    let nearest_neighbor;

    for (const neighbor of unvisited) {
        const distance = calculate_distance(current, neighbor);
        if (distance < best_distance) {
            best_distance = distance;
            nearest_neighbor = neighbor;
        }
    }

    return nearest_neighbor;
}

function solve_tsp(coordinates: Coordinates[]): Coordinates[] {
    const path: Coordinates[] = [];
    let current = coordinates[0];
    const unvisited = coordinates.slice(1);

    while (unvisited.length > 0) {
        path.push(current);
        const nearest_neighbor = find_nearest_neighbor(current, unvisited);
        if (nearest_neighbor) {
            unvisited.splice(unvisited.indexOf(nearest_neighbor), 1);
            current = nearest_neighbor;
        }
    }

    path.push(coordinates[0]); // Return to the starting point to complete the cycle
    return path;
}

// Example usage
const clients: Coordinates[] = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 3, y: 1 },
    { x: 2, y: 4 },
];

const optimal_path = solve_tsp(clients);
console.log(optimal_path);
