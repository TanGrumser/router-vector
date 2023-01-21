import { Graph, Node } from "./types";

export const nodes : Node [] = ["A", "B", "C", "D"];

export const graph : Graph = {
    edges: [
        { weight: 10, from: "A", to: "B" },
        { weight: 1, from: "A", to: "C" },

        { weight: 1, from: "B", to: "C" },
        { weight: 2, from: "B", to: "D" },
        
        { weight: 4, from: "C", to: "D" },
    ]
};