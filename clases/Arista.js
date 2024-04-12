export default class Arista{
    constructor(id,nodoA,nodoB,color, tipo, capacidadEnlace, velocidadProcesamiento){
        this.id=id; //Identificador de la arista
        this.nodoA=nodoA; //Nodo origen
        this.nodoB=nodoB; //Nodo destino
        this.color=color; //Color de la arista
        this.tipo = tipo; // Enlace interno o externo de la red, internos (0-4) externos (5-10)
        this.capacidadEnlace = capacidadEnlace; // Cantidad de contencion de paquetes simultaneos del enlace
        this.velocidadProcesamiento = velocidadProcesamiento; // Cantidad de paquetes que puede procesar por ciclo de reloj
        this.colaPaquetes = colaPaquetes; // Cola de paquetes que se encuentran en la arista

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
    setColaPaquetes(colaPaquetes) {
        this.colaPaquetes = colaPaquetes;
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