function dijkstra(graph, sourceNode) {
    let dist = Infinity;
    let v = [];
    let queue = new PriorityQueue();
    queue.enqueue(sourceNode, 0);
    while (queue != empty){
        let u = queue.dequeue();
        if (u === v) return v;
        v.push(u);
        for (let next = 0; graph.length(current); next++){
             newdist = dist [u] + graph.length(u, next);
            if (newdist < dist[next]){
                dist[next] = newdist;
                queue.enqueue(next, dist[next]);
            }
        }
    }
    return dist;
}
