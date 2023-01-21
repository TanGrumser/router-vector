import { graph } from "./graph";
import { DistanceTable, Node } from "./types";

/**
 * 
 * @param from node to get the distance from
 * @param to node to get the distance to
 * @returns the distance if there is an edge between the two nodes, Infinity otherwise
 */
export function distanaceFromTo(from: Node, to: Node) : number {
    if (from === to) return 0;

    const edge = graph.edges.find(edge => 
        edge.from === from && edge.to === to ||
        edge.from === to && edge.to === from
    );

    return edge?.weight ?? Infinity;
}

/**
 * 
 * @param node node to get the neighbours of
 * @returns all direct neighbours of the node
 */
export function getNeighboursOf(node: Node) : Node[] {
    return [
        ...graph.edges.filter(edge => edge.from === node).map(edge => edge.to),
        ...graph.edges.filter(edge => edge.to === node).map(edge => edge.from),
    ];
}

/**
 * 
 * @returns wether the two nodes are neighbours
 */
export function isNeighbour(node: Node, other: Node) : boolean {
    return graph.edges.some(edge => 
        edge.from === node && edge.to === other ||
        edge.from === other && edge.to === node
    );
}

/**
 * 
 * @param node to get the shortest path from
 * @param neighbour 
 * @param previous 
 * @returns 
 */
export function getShortestPathToNeighbour(node: Node, to: Node, previous: DistanceTable) : number {
    const neighbours = getNeighboursOf(node);
    const distances = neighbours.map(neighbour => previous[node][neighbour][to] ?? Infinity);

    return Math.min(...distances);
}