import Paquete from "./Paquete";

export default class Grafo {
    constructor() {
        this.nodos = []
        this.paquetes = []
        this.aristas = []
    }

    agregarNodo(nodo) {
        this.nodos.push(nodo);
    }
    agregarArista(nodo) {
        this.aristas.push(nodo);
    }
    //Creacion de paquetes
    crearPaquetes(numeroPaquetes,nodoInicio,nodoFin){
        for (let i = 0; i < numeroPaquetes; i++){
            let paquete = new Paquete(i + 1, "Creado", nodoInicio,nodoFin); //Se asigna como nodo destino del paquete el ultimo nodo del grafo
            this.paquetes.push(paquete);
        }
        console.log(this.paquetes)
    }

    enviarPaquetes(){
        this.paquetes.forEach((paquete)=>{
            if (paquete.estado == false){
                paquete.ruta = dijkstra(this.nodos[0], paquete.destino);
                paquete.estado = true;
            }
        })
    }

    dijkstra(nodos, aristas, origenId, destinoId) {
        // Inicializar distancias y predecesores    
        const distancias = {};
        const predecesores = {};
        for (const nodo of nodos) {
            distancias[nodo.getId()] = Infinity;
            predecesores[nodo.getId()] = null;
        }
        distancias[origenId] = 0;
    
        // Crear conjunto de nodos no visitados
        const noVisitados = new Set(nodos.map(nodo => nodo.getId()));
    
        while (noVisitados.size > 0) {
            // Encontrar nodo no visitado con menor distancia
            let nodoActualId = null;
            let distanciaMinima = Infinity;
            for (const nodoId of noVisitados) {
                if (distancias[nodoId] < distanciaMinima) {
                    distanciaMinima = distancias[nodoId];
                    nodoActualId = nodoId;
                }
            }
    
            // Si no se encuentra un nodo actual, no hay solución
            if (nodoActualId === null) {
                return null;
            }
    
            // Eliminar el nodo actual del conjunto de nodos no visitados
            noVisitados.delete(nodoActualId);
    
            // Actualizar distancias y predecesores para los nodos adyacentes al nodo actual
            const nodoActual = nodos.find(nodo => nodo.getId() === nodoActualId);
            for (const vecino of nodoActual.vecinos) {
                const arista = aristas.find(arista => (arista.getNodoA().getId() === nodoActualId && arista.getNodoB().getId() === vecino.getId()) ||
                                                       (arista.getNodoB().getId() === nodoActualId && arista.getNodoA().getId() === vecino.getId()));
                const distanciaNueva = distancias[nodoActualId] + arista.pesoArista;
                if (distanciaNueva < distancias[vecino.getId()]) {
                    distancias[vecino.getId()] = distanciaNueva;
                    predecesores[vecino.getId()] = nodoActualId;
                }
            }
        }


    
        // Reconstruir el camino si se llegó al destino
        if (predecesores[destinoId] !== null || destinoId === origenId) {
            const camino = [];
            let nodoActualId = destinoId;
            while (nodoActualId !== null) {
                camino.push(nodoActualId);
                nodoActualId = predecesores[nodoActualId];
            }
            camino.reverse()
            let rutaNodos = []
            camino.forEach((id)=>{
                let nodoR = nodos.filter((nodo)=>nodo.getId()==id)[0]
                rutaNodos.push(nodoR)
            })
            
            return rutaNodos; // Invertir el camino para obtenerlo desde el origen
        } else {
            // No se encontró un camino desde el origen hasta el destino
            return null;
        }
    }
}