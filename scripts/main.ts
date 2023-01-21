import { nodes } from "./graph";
import { 
    DistanceTable,
    DistancesOverNode,
    DistancesToNode,
} from "./types";
import { distanaceFromTo, getNeighboursOf, getShortestPathToNeighbour, isNeighbour } from "./utils";

init();

function init() {
    RoutingVector();
}

function RoutingVector() {
    let timesteps : DistanceTable[] = [getInitialState()];

    do {
        updateTables(timesteps);
    } while (hasAnyNodeDistanceChanged(timesteps));

    printTables(timesteps);
}

function printTables(timesteps : DistanceTable[]) {
    for (const timestep of timesteps) {
        console.log("Timestep: ", timesteps.indexOf(timestep));

        for (const node of nodes) {
            let header = node + "  |  ";
            getNeighboursOf(node).forEach(neighbour => header += neighbour + "  |  ");
            console.log(header);
            for (const to of nodes.filter(n => n !== node)) {
                let row = to + "  |";
                getNeighboursOf(node).forEach(neighbour => 
                    row += ("  " + 
                    (timestep[node][neighbour][to] === Infinity ? "-" : timestep[node][neighbour][to])
                      + "   ").substring(0,6)
                    );
                console.log(row);
            }
            
            console.log();
        }

    }
}

function updateTables(timesteps : DistanceTable[]) {
    if (timesteps.length === 0) {
        throw Error("No initial state");
    } 
    
    const previous = timesteps[timesteps.length - 1];
    const next : DistanceTable = {};

    for (const node of nodes) {
        const distancesOverNode : DistancesOverNode = {};

        for (const neighbour of getNeighboursOf(node)) {
            const distanceTo : DistancesToNode = {};

            for (const other of nodes) {
                if (node !== other) {
                    distanceTo[other] = Math.min(
                        previous[node][neighbour][other],
                        getShortestPathToNeighbour(neighbour, other, previous) + distanaceFromTo(node, neighbour)
                    );
                }
            }

            distancesOverNode[neighbour] = distanceTo;
        }

        next[node] = distancesOverNode;
    }

    timesteps.push(next);
}

function getInitialState() : DistanceTable {
    const distanceTable : DistanceTable = {};

    for (const node of nodes) {
        const distancesOverNode : DistancesOverNode = {};
        
        for (const neighbour of getNeighboursOf(node)) {
            const distanceTo : DistancesToNode = {};    
            
            for (const other of nodes) {
                if (node !== other) {
                    distanceTo[other] = (neighbour == other ? distanaceFromTo(node, neighbour) : Infinity);
                }
            }

            distancesOverNode[neighbour] = distanceTo;
        }

        distanceTable[node] = distancesOverNode;
    }

    return distanceTable;
}

function hasAnyNodeDistanceChanged(timesteps: DistanceTable[]) : boolean {
    if (timesteps.length < 2) return true;

    const current = timesteps[timesteps.length - 1];
    const previous = timesteps[timesteps.length - 2];
    
    for (const node of nodes) {
        for (const neighbour of getNeighboursOf(node)) {
            for (const other of nodes)
                if (current[node][neighbour][other] !== previous[node][neighbour][other]) return true;
        }
    }

    return false;
}
