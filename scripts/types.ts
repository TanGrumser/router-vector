export type Node = string;

export interface Graph {
    edges: Edge[]
}

export interface Edge {
    weight: number,
    from: Node,
    to: Node
}

export type DistancesToNode = Record<Node, number>;
export type DistancesOverNode = Record<Node, DistancesToNode>;
export type DistanceTable = Record<Node, DistancesOverNode>;
