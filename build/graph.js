"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = exports.nodes = void 0;
exports.nodes = ["A", "B", "C", "D"];
exports.graph = {
    edges: [
        { weight: 10, from: "A", to: "B" },
        { weight: 1, from: "A", to: "C" },
        { weight: 1, from: "B", to: "C" },
        { weight: 2, from: "B", to: "D" },
        { weight: 4, from: "C", to: "D" },
    ]
};
