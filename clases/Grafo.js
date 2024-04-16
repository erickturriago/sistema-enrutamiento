class Grafo {
    constructor() {
        this.nodos = new Set();
        this.paquetes = new Set();
    }

    agregarNodo(nodo) {
        this.nodos.add(nodo);
    }
    //Creacion de paquetes
    crearPaquete(){
        numeroPaquetes = Math.floor(Math.random() * 20 + 1)
        // console.log("numero de paquetes: " + numeroPaquetes)
        for (let i = 0; i < numeroPaquetes; i++){
            let paquete = new Paquete(i + 1, false, this.nodos[this.nodos.length - 1]); //Se asigna como nodo destino del paquete el ultimo nodo del grafo
            this.this.paquetes.push(paquete);
        }
        console.log('Paquetes: ' + this.this.paquetes)
    }

    enviarPaquetes(){
        this.paquetes.forEach((paquete)=>{
            if (paquete.estado == false){
                paquete.ruta = dijkstra(this.nodos[0], paquete.destino);
                paquete.estado = true;
            }
        })
    }

    dijkstra(nodoInicio) {
        let distancias = {};
        this.nodos.forEach(nodo => {
            distancias[nodo] = Infinity;
        });
        distancias[nodoInicio] = 0;
    
        let visitados = new Set();
    
        while (Object.keys(distancias).length !== visitados.size) {
            let nodoActual = Object.keys(distancias).reduce((nodoMasCercano, nodo) => {
                return distancias[nodo] < distancias[nodoMasCercano] && !visitados.has(nodo) ? nodo : nodoMasCercano;
            }, nodoInicio);
    
            visitados.add(nodoActual);
    
            for (let nodoAdyacente in nodoActual.aristas) {
                let nuevaDistancia = distancias[nodoActual] + this.pesoArista(nodoActual, nodoAdyacente);
                if (nuevaDistancia < distancias[nodoAdyacente]) {
                    distancias[nodoAdyacente] = nuevaDistancia;
                }
            }
        }
        return distancias;
    }
}