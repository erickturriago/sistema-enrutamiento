export default class Arista{
    constructor(id,nodoA,nodoB,color, tipo, longitud, atenuacion, anchoBanda){
        this.id=id; //Identificador de la arista
        this.nodoA=nodoA; //Nodo origen
        this.nodoB=nodoB; //Nodo destino
        this.color=color; //Color de la arista
        this.tipo = tipo; // Enlace interno o externo de la red, internos (0-4) externos (5-10)
        this.longitud = longitud; // Longitud de la arista
        this.atenuacion = atenuacion; // Atenuacion de la arista
        this.anchoBanda = anchoBanda; // Ancho de banda de la arista

        //
        this.colaPaquetes = colaPaquetes; // Cola de paquetes que se encuentran en la arista
        this.pesoArista = Infinity; // Peso de la arista
    }
    // Getter y setter para id
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    // Getter y setter para nodoA
    getNodoA() {
        return this.nodoA;
    }
    setNodoA(nodoA) {
        this.nodoA = nodoA;
    }
    // Getter y setter para nodoB
    getNodoB() {
        return this.nodoB;
    }
    setNodoB(nodoB) {
        this.nodoB = nodoB;
    }
    
    // Getter y setter para cola de paquetes
    getColaPaquetes() {
        return this.colaPaquetes;
    }
    // Agregar a la cola de paquetes
    agregarPaquete(paquete){
        if (this.capacidadEnlace > this.colaPaquetes.length){
            this.colaPaquetes.push(paquete);
        } else {
            console.log("No hay espacio en la cola de paquetes");
            //Recalcular la ruta para el paquete utilizando otra arista
        }
    }
    enviarPaquete() {
        if(evaluarCaida()){
            if (this.paquetes.length > 0) {
                let ultimoPaquete = this.paquetes.pop();
                this.nodoB.recibirPaquete(ultimoPaquete);
            } else {
                console.log("No hay paquetes para enviar");
            }
        }
    }
    pesoArista(){
        this.pesoArista = this.anchoBanda/(this.longitud*this.atenuacion);
    }
    evaluarCaida(){
        if (tipo == 'interno'){
            let probabilidad = Math.random();
            if (probabilidad < 0.001){
                return false;
            }
        } else {
            let probabilidad = Math.random();
            if (probabilidad < 0.01){
                return false;
            }
        }
    }


}