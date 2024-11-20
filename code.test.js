import { dijkstra } from "./code.js";

/* Custom Graphs for Testing */
class GraphNode {
    constructor(name, edges) {
        this.name = name; // Node name or index
        this.edges = edges; // Array of edge weights
    }
}

// Helper to create graphs in adjacency list format
function createGraph(nodes, edges) {
    let graph = {};
    for (let i = 0; i < nodes; i++) {
        graph[i] = {}; // Initialize an empty adjacency list for the node
    }
    edges.forEach(([src, dest, weight]) => {
        graph[src][dest] = weight; // Add edge to adjacency list
    });
    return graph;
}


/* Test Cases */
const testCases = [
    {
        graph: createGraph(4, [
            [0, 1, 1],
            [0, 2, 4],
            [1, 2, 2],
            [1, 3, 5],
            [2, 3, 1],
        ]),
        sourceNode: 0,
        expected: { 0: 0, 1: 1, 2: 3, 3: 4 },
    },
    {
        graph: createGraph(1, []), // Single node
        sourceNode: 0,
        expected: { 0: 0 },
    },
    {
        graph: createGraph(4, []), // Disconnected graph
        sourceNode: 0,
        expected: { 0: 0, 1: Infinity, 2: Infinity, 3: Infinity },
    },
];

/* Test Runner */
function runTests() {
    let passed = 0;

    testCases.forEach(({ graph, sourceNode, expected }, index) => {
        const result = dijkstra(graph, sourceNode);

        // Compare results
        const match = Object.keys(expected).every(
            (node) => result[node] === expected[node]
        );

        if (match) {
            console.log(`Test case ${index + 1}: Passed`);
            passed++;
        } else {
            console.error(`Test case ${index + 1}: Failed`);
            console.error(`Expected:`, expected);
            console.error(`Got:`, result);
        }
    });

    console.log(`${passed}/${testCases.length} tests passed.`);
}

// Run the tests
runTests();

