export default class Arista{
    constructor(id,nodoA,nodoB,color){
        this.id=id;
        this.nodoA=nodoA;
        this.nodoB=nodoB;
        this.color=color;
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
}