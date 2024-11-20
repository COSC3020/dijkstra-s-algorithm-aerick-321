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
