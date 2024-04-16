export default class Nodo{
    constructor(id,x,y,color){
        this.id=id;
        this.x=x;
        this.y=y;
        this.color=color;
        this.vecinos=[]
        this.aristas=[]
        this.paquetes = null;
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

    addVecino(nodo){
        if(!this.vecinos.includes(nodo)){
            this.vecinos.push(nodo)
        }
        this.aristas.push(new Arista(this.aristas.length, this, nodo, 'black', 0, 'cobre'));
    }
    recibirPaquete(paquete) {
        if (!this.paquetes) {
            this.paquetes = [];
        }
        this.paquetes.push(paquete);
    }
    enviarPaquete() {
        
    }

}