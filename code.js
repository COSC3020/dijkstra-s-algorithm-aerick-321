function dijkstra(graph, sourceNode) {
    let dist = [Infinity]; 
    dist [sourceNode] = 0;
    let visited;
    let queue = new PriorityQueue();
    queue.enqueue(sourceNode, 0);
    while (!queue.isEmpty()){
        let u = queue.dequeue();
        if (u in visited) {
           continue;
        }
        visited.add(u);
        for (let next of graph[u]){
            let weight = graph[u][next]; 
            let newdist = dist[u] + weight;
            if (newdist < dist[next]){
                dist[next] = newdist;
                queue.enqueue(next, dist[next]);
            }
        }
    }
    return dist;
}
