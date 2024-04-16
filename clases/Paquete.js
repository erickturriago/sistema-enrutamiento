class Paquete {
    constructor(id, estado, destino) {
        this.id = id;
        this.nodosVisitados = [];
        this.ruta = [];
        this.estado = false;
        this.destino = destino;
    }
    // Getter y setter para id
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    // Getter y setter para estado
    getEstado() {
        return this.estado;
    }
    setEstado(estado) {
        this.estado = estado;
    }
    // Getter y setter para ruta
    getRuta() {
        return this.ruta;
    }
    setRuta(ruta) {
        this.ruta = ruta;
    }
    // Getter y setter para nodos Visitados
    getNodosVisitados() {
        return this.nodosVisitados;
    }
    setNodosVisitados(nodosVisitados) {
        this.nodosVisitados = nodosVisitados;
    }
}