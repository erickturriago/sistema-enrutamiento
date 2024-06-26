
export default class Nodo{
    constructor(id,x,y,color,tipo){
        this.id=id;
        this.x=x;
        this.y=y;
        this.color=color;
        this.vecinos=[]
        this.tipo=tipo
        this.paquetes = [];
    }
     // Getter y setter para id
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

    // Getter y setter para x
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }

    // Getter y setter para y
    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
    }

    // Getter para tipo
    getTipo() {
        return this.tipo;
    }

    addPaquete(paquete){
        this.paquetes.push(paquete)
    }

    addVecino(nodo){
        if(!this.vecinos.includes(nodo)){
            this.vecinos.push(nodo)
        }
    }
    recibirPaquete(paquete) {
        if (!this.paquetes) {
            this.paquetes = [];
        }
        this.paquetes.push(paquete);
    }
    enviarPaquete() {
        
    }

    setColor(color){
        this.color=color;
    }

}