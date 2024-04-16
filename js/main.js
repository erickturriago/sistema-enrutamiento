import Arista from "../clases/Arista"
import Nodo from "../clases/Nodo"
import WorkerReloj from './workers/Reloj.js?worker'
import {drawAll} from './Paint'

let listaNodos = []
let listaAristas = []
let workerReloj = new WorkerReloj("./Reloj.js")

const iniciarApp = ()=>{
    configurarManejadores()
    workerReloj.postMessage({ cmd: 'iniciarReloj', isRunning:true, timeOut: 1000 });
}

const detenerApp = ()=>{
    workerReloj.terminate();
    workerReloj = new WorkerReloj('./Reloj.js');
    configurarManejadores(); // Volver a configurar los manejadores de eventos
}

const editAristas = ()=>{
    let editadas = []
    let aristaAleatoria = null
    listaAristas.forEach((arista,index)=>{
        do{
            aristaAleatoria = listaAristas[Math.floor(Math.random() * listaAristas.length)];
        }while(editadas.includes(aristaAleatoria))
    })
}

function configurarManejadores() {
    workerReloj.onmessage = function(e) {
        if (e.data === "editNodes") {
            console.log("Editando nodos");
            editNodes();
        }
        if (e.data === "dibujar") {
            console.log("Dibujando nodos");
            requestAnimationFrame(drawAll);
        }
    };
}

export {listaAristas,listaNodos,iniciarApp,detenerApp}