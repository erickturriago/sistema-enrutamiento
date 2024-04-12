export default class Nodo{
    constructor(id,x,y,color){
        this.id=id;
        this.x=x;
        this.y=y;
        this.color=color;
        this.vecinos=[]
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
    }
}