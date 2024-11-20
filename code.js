class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority); // Sort by priority (ascending)
    }
    dequeue() {
        return this.items.shift(); // Remove and return the item with the highest priority (lowest value)
    }
    isEmpty() {
        return this.items.length === 0;
    }
}

export function dijkstra(graph, sourceNode) {
    let dist = {};
     for (let node in graph) {
        dist[node] = Infinity; // Set all distances to infinity
    }
    
    dist [sourceNode] = 0;
    let visited = new Set();
    let queue = new PriorityQueue();
    queue.enqueue(sourceNode, 0);
    
    while (!queue.isEmpty()){
       let { element: u } = queue.dequeue();
        if (visited.has(u)) {
           continue;
        }
        visited.add(u);
        
        for (let next in graph[u]){
            let weight = graph[u][next]; 
            let newdist = dist[u] + weight;
            
            if (newdist < dist[next]){
                dist[next] = newdist;
                queue.enqueue(next, newdist);
            }
        }
    }
    return dist;
}
