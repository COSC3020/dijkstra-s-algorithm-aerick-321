const fs = require('fs');
const jsc = require('jsverify');

// Load Dijkstra's algorithm implementation
eval(fs.readFileSync('code.js') + '');

// Helper: Brute-force shortest path computation
function bruteForceShortestPaths(graph, source) {
    const nodes = Object.keys(graph);
    const distances = {};
    nodes.forEach(node => distances[node] = Infinity);
    distances[source] = 0;

    for (let i = 0; i < nodes.length - 1; i++) {
        for (let u of nodes) {
            for (let { node: v, weight } of graph[u]) {
                if (distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                }
            }
        }
    }

    return distances;
}

// Property-based test
const test = jsc.forall(
    jsc.dict(jsc.array(jsc.record({ node: jsc.nat, weight: jsc.nat }))), // Random weighted graph
    jsc.nat, // Source node
    function (graph, source) {
        // Ensure graph keys are numbers
        graph = Object.fromEntries(Object.entries(graph).map(([k, v]) => [Number(k), v]));
        if (!(source in graph)) return true; // Skip invalid cases

        const dijkstraResult = dijkstra(graph, source);
        const bruteForceResult = bruteForceShortestPaths(graph, source);

        return JSON.stringify(dijkstraResult) === JSON.stringify(bruteForceResult);
    }
);

// Run the test
jsc.assert(test, { tests: 1000 });
