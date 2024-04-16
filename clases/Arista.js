export default class Arista{
    constructor(id, nodoA, nodoB, color, tipo, material){
        this.id=id; //Identificador de la arista
        this.nodoA=nodoA; //Nodo origen
        this.nodoB=nodoB; //Nodo destino
        this.color=color; //Color de la arista
        this.tipo = tipo; // Enlace interno o externo de la red, internos (0-4) externos (5-10)
        this.material = material; // Material de la arista
        
        this.longitud = null; // Longitud de la arista
        this.atenuacion = null; // Enlace interno
        this.anchoBanda = null; // Ancho de banda de la arista

        // this.colaPaquetes = colaPaquetes; // Cola de paquetes que se encuentran en la arista
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
    // Calcular el peso de la arista
    pesoArista() {
        if (this.anchoBanda == null || this.atenuacion == null || this.longitud == null) { //Leer datos si no se han establecido
            fetch('Materiales.json')
                .then(response => response.json())
                .then(data => { 
                    const indiceAleatorio = Math.floor(Math.random() * 3) + 1;
                    const materialAleatorio = data[indiceAleatorio];
                    this.longitud = calcularLongitudArista();
                    this.anchoBanda = materialAleatorio.ancho_banda;
                    this.atenuacion = materialAleatorio.factor_atenuacion;
                    
                    // Calcular el peso de la arista
                    this.pesoArista = (this.longitud * this.atenuacion.valor) / this.anchoBanda.valor;
                })
                .catch(error => console.error('Error al leer el archivo Materiales.json:', error));
        } else {
            // Calcular el peso de la arista si ya se han asignado los valores de ancho de banda, longitud y atenuación
            this.pesoArista = (this.longitud * this.atenuacion.valor) / this.anchoBanda.valor;
        }
    }

    calcularLongitudArista(){
        let x1 = this.nodoA.getX();
        let y1 = this.nodoA.getY();
        let x2 = this.nodoB.getX();
        let y2 = this.nodoB.getY();
        let distancia = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2))*100; //LONGITUD DE LA ARISTA
        return distancia;
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