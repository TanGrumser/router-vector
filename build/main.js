"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph_1 = require("./graph");
const utils_1 = require("./utils");
init();
function init() {
    RoutingVector();
}
function RoutingVector() {
    let timesteps = [getInitialState()];
    do {
        updateTables(timesteps);
    } while (hasAnyNodeDistanceChanged(timesteps));
    printTables(timesteps);
}
function printTables(timesteps) {
    for (const timestep of timesteps) {
        console.log("Timestep: ", timesteps.indexOf(timestep));
        for (const node of graph_1.nodes) {
            let header = node + "  |  ";
            (0, utils_1.getNeighboursOf)(node).forEach(neighbour => header += neighbour + "  |  ");
            console.log(header);
            for (const to of graph_1.nodes.filter(n => n !== node)) {
                let row = to + "  |";
                (0, utils_1.getNeighboursOf)(node).forEach(neighbour => row += ("  " +
                    (timestep[node][neighbour][to] === Infinity ? "-" : timestep[node][neighbour][to])
                    + "   ").substring(0, 6));
                console.log(row);
            }
            console.log();
        }
    }
}
function updateTables(timesteps) {
    if (timesteps.length === 0) {
        throw Error("No initial state");
    }
    const previous = timesteps[timesteps.length - 1];
    const next = {};
    for (const node of graph_1.nodes) {
        const distancesOverNode = {};
        for (const neighbour of (0, utils_1.getNeighboursOf)(node)) {
            const distanceTo = {};
            for (const other of graph_1.nodes) {
                if (node !== other) {
                    distanceTo[other] = Math.min(previous[node][neighbour][other], (0, utils_1.getShortestPathToNeighbour)(neighbour, other, previous) + (0, utils_1.distanaceFromTo)(node, neighbour));
                }
            }
            distancesOverNode[neighbour] = distanceTo;
        }
        next[node] = distancesOverNode;
    }
    timesteps.push(next);
}
function getInitialState() {
    const distanceTable = {};
    for (const node of graph_1.nodes) {
        const distancesOverNode = {};
        for (const neighbour of (0, utils_1.getNeighboursOf)(node)) {
            const distanceTo = {};
            for (const other of graph_1.nodes) {
                if (node !== other) {
                    distanceTo[other] = (neighbour == other ? (0, utils_1.distanaceFromTo)(node, neighbour) : Infinity);
                }
            }
            distancesOverNode[neighbour] = distanceTo;
        }
        distanceTable[node] = distancesOverNode;
    }
    return distanceTable;
}
function hasAnyNodeDistanceChanged(timesteps) {
    if (timesteps.length < 2)
        return true;
    const current = timesteps[timesteps.length - 1];
    const previous = timesteps[timesteps.length - 2];
    for (const node of graph_1.nodes) {
        for (const neighbour of (0, utils_1.getNeighboursOf)(node)) {
            for (const other of graph_1.nodes)
                if (current[node][neighbour][other] !== previous[node][neighbour][other])
                    return true;
        }
    }
    return false;
}
