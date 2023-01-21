"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortestPathToNeighbour = exports.isNeighbour = exports.getNeighboursOf = exports.distanaceFromTo = void 0;
const graph_1 = require("./graph");
/**
 *
 * @param from node to get the distance from
 * @param to node to get the distance to
 * @returns the distance if there is an edge between the two nodes, Infinity otherwise
 */
function distanaceFromTo(from, to) {
    if (from === to)
        return 0;
    const edge = graph_1.graph.edges.find(edge => edge.from === from && edge.to === to ||
        edge.from === to && edge.to === from);
    return edge?.weight ?? Infinity;
}
exports.distanaceFromTo = distanaceFromTo;
/**
 *
 * @param node node to get the neighbours of
 * @returns all direct neighbours of the node
 */
function getNeighboursOf(node) {
    return [
        ...graph_1.graph.edges.filter(edge => edge.from === node).map(edge => edge.to),
        ...graph_1.graph.edges.filter(edge => edge.to === node).map(edge => edge.from),
    ];
}
exports.getNeighboursOf = getNeighboursOf;
/**
 *
 * @returns wether the two nodes are neighbours
 */
function isNeighbour(node, other) {
    return graph_1.graph.edges.some(edge => edge.from === node && edge.to === other ||
        edge.from === other && edge.to === node);
}
exports.isNeighbour = isNeighbour;
/**
 *
 * @param node to get the shortest path from
 * @param neighbour
 * @param previous
 * @returns
 */
function getShortestPathToNeighbour(node, to, previous) {
    const neighbours = getNeighboursOf(node);
    const distances = neighbours.map(neighbour => previous[node][neighbour][to] ?? Infinity);
    return Math.min(...distances);
}
exports.getShortestPathToNeighbour = getShortestPathToNeighbour;
