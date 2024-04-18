import Arista from "../clases/Arista"
import Nodo from "../clases/Nodo"
import WorkerReloj from './workers/Reloj.js?worker'
import {drawAll,idArista} from './Paint'
import Paquete from "../clases/Paquete"
import Grafo from "../clases/Grafo"
import Examples from "../data/Redes.json"

let workerReloj = new WorkerReloj("./Reloj.js")
let numPaquetes = undefined
let nodoInicio = undefined
let nodoFin = undefined
let paquetesLlegaron = []

let iconRun = document.querySelector('.btnRun').querySelector('.fa-solid')

let colores = {
    "nodeBInicio":"#6163FF",
    "nodeP":"#000000",
    "nodeBFin":"#54202F"
}

const grafo = new Grafo();

const crearGrafoEjemplo =(id)=>{
    resetApp()
    const canvasWidth = window.innerWidth; // Ancho de la pantalla
    const canvasHeight = window.innerHeight; // Alto de la pantalla
    console.log(canvasWidth)
    console.log(canvasHeight)

    grafo.paquetes=[]

    Examples[id-1].Nodos.forEach(nodo => {
        // Crear un nuevo nodo
        const nodoNuevo = new Nodo(
            nodo.id,
            nodo.x + canvasWidth / 2 - 500, // Centrar el nodo horizontalmente
            nodo.y + canvasHeight / 2  - 300, // Ajustar la coordenada Y y centrar el nodo verticalmente
            colores[nodo.tipo], // Obtener el color del nodo
            nodo.tipo
        );
        // const nodoNuevo = new Nodo(
        //     nodo.id,
        //     nodo.x, // Centrar el nodo horizontalmente
        //     nodo.y, // Ajustar la coordenada Y y centrar el nodo verticalmente
        //     colores[nodo.tipo], // Obtener el color del nodo
        //     nodo.tipo
        // );
        grafo.agregarNodo(nodoNuevo);
    });

    Examples[id-1].Nodos.forEach(nodo => {
        nodo.vecinos.forEach(vecinoId => {
            // Buscar el vecino en la lista de nodos del grafo
            const nodoB = grafo.nodos.find(n => n.id === nodo.id);
            const vecino = grafo.nodos.find(n => n.id === vecinoId);
            // Si se encuentra el vecino, agregarlo a la lista de vecinos del nodo actual
            if (vecino) {
                nodoB.addVecino(vecino);
            }
        });
    });

    // console.log(grafo.nodos)
    grafo.aristas=[]

    Examples[0].Aristas.forEach((arista)=>{
        let nodoA = grafo.nodos.find((nodo)=>nodo.id == arista.nodoA)
        let nodoB = grafo.nodos.find((nodo)=>nodo.id == arista.nodoB)
        let aristaNueva = new Arista(arista.id,nodoA,nodoB,"#000",null)
        // console.log(aristaNueva)
        grafo.agregarArista(aristaNueva)
    })
}


const iniciarApp = ()=>{


    inicializarDatos()

    console.log(nodoInicio)
    console.log(nodoFin)

    //Configurar nodo inicio
    grafo.crearPaquetes(parseInt(numPaquetes),nodoInicio,nodoFin)

    configurarManejadores()
    workerReloj.postMessage({ cmd: 'iniciarReloj', isRunning:true, timeOut: 300 });
}


const detenerApp = ()=>{
    workerReloj.terminate();
    workerReloj = new WorkerReloj('./Reloj.js');
    configurarManejadores(); // Volver a configurar los manejadores de eventos

    iconRun.classList.remove('fa-play')
    iconRun.classList.remove('fa-stop')
    iconRun.classList.add('fa-play')
    // resetPaquetes()
}

const resetPaquetes = ()=>{
    grafo.nodos.forEach((nodo)=>{nodo.paquetes=[]})
    paquetesLlegaron=[]
    grafo.paquetes=[]
}

const resetApp = ()=>{
    resetPaquetes()
    paquetesLlegaron=[]
    grafo.nodos = [];
    grafo.aristas=[]
    grafo.paquetes=[]
    requestAnimationFrame(drawAll)
}

const inicializarDatos = ()=>{
    //Configurar número de paquetes
    do{
        numPaquetes = prompt("Ingrese el número de paquetes (max 20)", "");
    }
    while(isNaN(numPaquetes) || parseInt(numPaquetes)>20)

    //Obtener un nodo inicial valido
    let idNodoInicio = undefined
    do{
        idNodoInicio = prompt("Ingrese el nodo de inicio (ID)", "");
        nodoInicio = Array.from(grafo.nodos).filter((nodo)=>nodo.getId()==idNodoInicio)[0]
        if(nodoInicio){
            if(nodoInicio.tipo!="nodeBInicio"){
                nodoInicio=null
            }
        }
    }
    while(isNaN(idNodoInicio) || idNodoInicio>grafo.nodos.size || nodoInicio==null)


    //Obtener un nodo final valido
    let idNodoFin = undefined
    do{
        idNodoFin = prompt("Ingrese el nodo de fin (ID)", "");
        nodoFin = Array.from(grafo.nodos).filter((nodo)=>nodo.getId()==idNodoFin)[0]
        if(nodoFin){
            if(nodoFin.tipo!="nodeBFin"){
                nodoFin=null
            }
        }
    }
    while(isNaN(idNodoFin) || idNodoFin>grafo.nodos.size || nodoFin==null)
}

const editAristas = ()=>{
    let editadas = []
    let aristaAleatoria = null
    grafo.aristas.forEach((arista,index)=>{
        //Cambiar peso random
        if(Math.floor(Math.random() * 10 + 1) == 1){
            console.log('Se cambio el material de la arista ' + arista.id)
            arista.setMaterialRandom()
        }
        //Eliminar arista random
        if(Math.random() <= 0.01){
            // console.log(grafo.aristas)
            console.log(`Eliminando arista de ${arista.nodoA.id} a ${arista.nodoB.id}`)
            arista.nodoA.vecinos = arista.nodoA.vecinos.filter((n)=>n.id!=arista.nodoB.id)
            arista.nodoB.vecinos = arista.nodoB.vecinos.filter((n)=>n.id!=arista.nodoA.id)
            arista.paquetes.forEach((paquete)=>{
                grafo.paquetes = grafo.paquetes.filter((paq)=>paq.id!=paquete.id)
                console.log(`Eliminando paquete -> ${paquete.id} `)
                console.log('Longitud Arreglo aristas: ' + grafo.aristas.length)
                paquete=null
            });
            arista.pesoArista = Infinity
            grafo.aristas = grafo.aristas.filter((a)=>a.id!=arista.id)
        }

        //Crear arista random
        // if(Math.random() <= 0.05){
        //     let aristaNueva = undefined;
        //     let nodoA = undefined;
        //     let nodoB = undefined;
        //     do {
        //         do {
        //             let idNodoA = Math.floor(Math.random() * grafo.nodos.length +1);
        //             let idNodoB = Math.floor(Math.random() * grafo.nodos.length +1);
        //             nodoA = grafo.nodos.find((nodo)=>nodo.id==idNodoA)
        //             nodoB = grafo.nodos.find((nodo)=>nodo.id==idNodoB)
        //         } while (nodoA == nodoB)
        //         aristaNueva = grafo.aristas.find(arista => (arista.getNodoA().getId() === nodoA && arista.getNodoB().getId() === nodoB.getId()) ||
        //                                                (arista.getNodoB().getId() === nodoA && arista.getNodoA().getId() === nodoB.getId()));
        //     } while(aristaNueva)
        //     aristaNueva = new Arista (grafo.aristas[grafo.aristas.length-1].id+1, nodoA, nodoB, '#0000', null)
        //     aristaNueva.nodoA.vecinos.push(aristaNueva.nodoB)
        //     aristaNueva.nodoB.vecinos.push(aristaNueva.nodoA)
        //     grafo.agregarArista(aristaNueva)
        //     console.log('Agregando nueva arista: '); 
        //     console.log(aristaNueva)
        // }
    })
    requestAnimationFrame(drawAll)
}

const avanzarPaquetes = ()=>{

    //Disminuir el delay de cada nodo en cada arista en cada ciclo de reloj
    let paquetesEnArista = grafo.paquetes.filter((paquete)=>paquete.estado=="EnArista")
    paquetesEnArista.forEach((paquete)=>{
        if(paquete.delay>0){
            paquete.delay = paquete.delay-1;
        }
        else if(paquete.delay==0){
            // if(paquete.ruta[1].paquetes.length>0 && paquete.ruta[1]!=nodoFin){
            //     paquete.delay++
            //     return
            // }
            let arista = paquete.aristaActual
            arista.paquetes = arista.paquetes.filter((paqueteA)=>(paqueteA.id!=paquete.id))
            paquete.nodoActual=paquete.ruta[1];
            paquete.nodoActual.addPaquete(paquete);
            paquete.estado = "EnNodo"
            paquete.arista=null
            console.log(arista.paquetes)
            console.log(`Paquete ${paquete.id} -> sale y carga en nodo ${paquete.nodoActual.id}`)
            console.log(`Longitud paquetes nodo ${paquete.nodoActual.id} -> ${paquete.nodoActual.paquetes.length}`)
        }
    })

    //Avance de paquetes en aristas
    let paquetesEnNodo = grafo.paquetes.filter((paquete)=>paquete.estado=="EnNodo")
    paquetesEnNodo.forEach((paquete)=>{
        if(paquete.delay==0){
            paquete.delay=undefined
            return
        }
        else{
            // console.log(paquete.nodoActual)
            // console.log(nodoFin)
            console.log(`Ruta paq ${paquete.id} de ${paquete.nodoActual.getId()} a ${nodoFin.getId()}`)
            console.log(grafo.nodos)
            console.log(grafo.aristas)
            let ruta = grafo.dijkstra(grafo.nodos,grafo.aristas,paquete.nodoActual.getId(),nodoFin.getId())
            paquete.setRuta(ruta);
            console.log(ruta)
            cargarPaqueteArista(paquete)

        }
    })

    let paquetesSinArrancar = grafo.paquetes.filter((paquete)=>paquete.estado=="Creado")
    if(paquetesSinArrancar.length>0){
        if(nodoInicio.paquetes.length==0){
            nodoInicio.paquetes.push(paquetesSinArrancar[0])
            paquetesSinArrancar[0].estadoAnterior=paquetesSinArrancar[0].estado
            paquetesSinArrancar[0].estado = "EnNodo"
            paquetesSinArrancar[0].nodoActual=nodoInicio;
            console.log(`Paquete ${paquetesSinArrancar[0].id} -> en Inicio`)
        }
    }
}

const cargarPaqueteArista = (paquete)=>{

    if(!paquete.ruta){
        return
    }

    if(paquete.ruta.length==1){
        console.log(`Paquete ${paquete.id} -> Llegó`)
        paquete.estado = "Llegó"
        paquetesLlegaron.push(paquete)
        return
    }

    let arista = grafo.aristas.find((arista)=> (arista.nodoA.getId() == paquete.nodoActual.getId() && arista.nodoB.getId()==paquete.getRuta()[1].getId()) || (arista.nodoB.getId() == paquete.nodoActual.getId() && arista.nodoA.getId()==paquete.getRuta()[1].getId()))

    paquete.nodoAnterior = paquete.nodoActual
    switch (arista.material) {
        case 'Coaxial':
            paquete.delay = 2
            break;
        case 'Cobre':
            paquete.delay = 4
            break;
        case 'Fibra óptica':
            paquete.delay = 0
            break;
        default: paquete.delay = 1
    }    

    arista.paquetes.push(paquete)
    paquete.aristaActual=arista
    paquete.estado = "EnArista"
    console.log(`Paquete ${paquete.id} cargado a la arista entre ${arista.nodoA.id} - ${arista.nodoB.id}`)

    paquete.nodoActual.paquetes = paquete.nodoActual.paquetes.filter((paq)=>paq.id!=paquete.id)
    paquete.nodoActual=null
}



function configurarManejadores() {
    workerReloj.onmessage = function(e) {
        if (e.data === "editNodes") {
            // console.log("Editando nodos");
            editAristas();
            requestAnimationFrame(drawAll);
        }
        if (e.data === "dibujar") {
            // console.log("Dibujando nodos");
        }
        if (e.data === "avanzarPaquetes") {
            console.log("-------------------------------------------------")
            // console.log("Avanzando paquetes");

            avanzarPaquetes();

            let bandera = true
            grafo.paquetes.forEach((paquete)=>{
                if(paquete.estado!="Llegó"){
                    bandera=false
                }
            })


            if(bandera){
                grafo.aristas.forEach((arista)=>{
                    arista.paquetes=[]
                })
                detenerApp()
                if(paquetesLlegaron.length<numPaquetes){
                    console.log("Se perdieron " + (numPaquetes-paquetesLlegaron.length) + " paquetes")
                }
                alert("Orden llegada: "+paquetesLlegaron.map((p)=>p.id))
                
                resetPaquetes()
            }
            requestAnimationFrame(drawAll)
        }
    };
}

export {grafo,iniciarApp,detenerApp,crearGrafoEjemplo, resetApp}