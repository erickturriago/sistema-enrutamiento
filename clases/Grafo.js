class Grafo {
    constructor() {
        this.nodos = new Set();
    }

    agregarNodo(nodo) {
        this.nodos.add(nodo);
    }

    dijkstra(nodoInicio, nodoDestino) {
        nodoInicio.setDistancia(0);

        let nodosNoVisitados = new Set(this.nodos);

        while (nodosNoVisitados.size > 0) {
            let nodoActual = [...nodosNoVisitados].reduce((nodoMasCercano, nodo) => 
                nodo.getDistancia() < nodoMasCercano.getDistancia() ? nodo : nodoMasCercano
            );

            nodosNoVisitados.delete(nodoActual);

            if (nodoActual === nodoDestino) {
                return nodoActual.getDistancia();
            }

            for (let vecino of nodoActual.getVecinos()) {
                let distanciaTentativa = nodoActual.getDistancia() + 1; // asumimos que la distancia entre nodos es 1
                if (distanciaTentativa < vecino.getDistancia()) {
                    vecino.setDistancia(distanciaTentativa);
                }
            }
        }
        return Infinity;
    }
}