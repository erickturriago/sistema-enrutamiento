const canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
import Nodo from "../clases/Nodo"
import Arista from "../clases/Arista"

import {grafo} from './main'

let brushWidth = 5,
color="#000",
toolActive=undefined,
radius = 30,
arista = [],
idNodo=1,
idArista=1,
nodeMove=null,
tipoNodo = "nodeP",
colores = {
    "nodeBInicio":"#6163FF",
    "nodeP":"#000000",
    "nodeBFin":"#54202F"
}

const setTipoNodo = (tipo)=>{
    tipoNodo=tipo;
}


const drawAll=()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grafo.aristas.forEach((arista)=>{
        // console.log("dibujando aristas")
        ctx.lineWidth=brushWidth;
        ctx.strokeStyle = arista.color;

        if(arista.material=="Coaxial"){
            ctx.setLineDash([10, 10])
        }
        else if(arista.material=="Cobre"){
            ctx.setLineDash([20, 5])
        }
        else if(arista.material=="Fibra óptica"){
            ctx.setLineDash([])
        }

        ctx.beginPath(); // Iniciar un nuevo camino de dibujo
        ctx.moveTo(arista.nodoA.getX(), arista.nodoA.getY()); // Mover el lápiz al punto A
        ctx.lineTo(arista.nodoB.getX(), arista.nodoB.getY()); // Dibujar una línea hasta el punto B
        ctx.stroke();

        // Calcular la mitad de la arista
        var mitadX = (arista.nodoA.getX() + arista.nodoB.getX()) / 2;
        var mitadY = (arista.nodoA.getY() + arista.nodoB.getY()) / 2;

        var angulo = Math.atan2(arista.nodoB.getY() - arista.nodoA.getY(), arista.nodoB.getX() - arista.nodoA.getX());
        var separacion = 30; // Distancia entre los cuadros

        var cantidadPaquetes = arista.paquetes.length;
        var espaciado = (cantidadPaquetes - 1) * separacion; // Espaciado total entre los cuadros

        // Calcular el inicio de la primera posición de los cuadros
        var inicioX = mitadX - (espaciado / 2) * Math.cos(angulo);
        var inicioY = mitadY - (espaciado / 2) * Math.sin(angulo);

        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#0006BD";

        for (var i = 0; i < cantidadPaquetes; i++) {
            console.log(`Arista de ${arista.nodoA.id} a ${arista.nodoB.id}`)
            console.log(`Dibujando paquete ${arista.paquetes[i].id}`)
            var offsetX = Math.cos(angulo) * (i * separacion); // Ajustar la posición horizontal con separación
            var offsetY = Math.sin(angulo) * (i * separacion); // Ajustar la posición vertical con separación
            ctx.fillRect(inicioX + offsetX - 10, inicioY + offsetY - 10, 20, 20); // Dibujar un cuadro en la posición
            ctx.strokeRect(inicioX + offsetX - 10, inicioY + offsetY - 10, 20, 20); // Dibujar el borde del cuadro
            ctx.stroke();
        }


        // console.log("Arista dibujada")
    })

    grafo.nodos.forEach((nodo)=>{
        // console.log(nodo)
        ctx.beginPath();
        ctx.setLineDash([])
        ctx.lineWidth=brushWidth
        ctx.strokeStyle = nodo.color;
        ctx.fillStyle=nodo.color;
        ctx.arc(nodo.x, nodo.y, radius, 0, 2 * Math.PI);
        ctx.stroke()
        ctx.fill()

        ctx.font = '40px Arial'; // Fuente y tamaño
        ctx.fillStyle = 'white'; // Color del texto
        if(nodo.getId()>=10){
            ctx.fillText(nodo.getId(), nodo.x-22, nodo.y+15);
        }
        else{
            ctx.fillText(nodo.getId(), nodo.x-12, nodo.y+15);
        }


        // Verificar si el nodo tiene paquetes
        if (nodo.paquetes.length > 0) {
            // Calcular la posición del paquete al lado del nodo
            var paqueteX = nodo.getX() + radius + 20; // 10 píxeles de separación entre el nodo y el paquete
            var paqueteY = nodo.getY(); // Al mismo nivel del nodo

            // Verificar colisión con otras aristas
            var colisionArista = grafo.aristas.some(arista => {
                var distancia = Math.abs((arista.nodoB.getY() - arista.nodoA.getY()) * paqueteX - (arista.nodoB.getX() - arista.nodoA.getX()) * paqueteY + arista.nodoB.getX() * arista.nodoA.getY() - arista.nodoB.getY() * arista.nodoA.getX()) / Math.sqrt((arista.nodoB.getY() - arista.nodoA.getX()) ** 2 + (arista.nodoB.getX() - arista.nodoA.getX()) ** 2);
                return distancia <= 5; // Tolerancia de 5 píxeles para la colisión
            });

            // Dibujar el paquete si no hay colisión
            if (!colisionArista) {
                // ctx.fillStyle = "#0006BD";
                ctx.fillStyle = "#0006BD";
                ctx.strokeStyle = "#000000";
                // ctx.font = '2px Arial'; // Fuente y tamaño
                // ctx.fillStyle = 'black'; // Color del texto
                // ctx.fillRect(paqueteX - 10, paqueteY - 10, 20, 20);
                // ctx.strokeRect(paqueteX - 10, paqueteY - 10, 20, 20);
                // ctx.fillText(paqueteX - 10, paqueteY - 10, 20, 20);
            }

            ctx.fillStyle = "#0006BD";
                ctx.strokeStyle = "#000000";

            ctx.fillRect(nodo.getX(), nodo.getY(), 20, 20);
            ctx.strokeRect(nodo.getX(), nodo.getY(), 20, 20);

        }
    })
}

const getNodoClick = (e)=>{
    let nodoEncontrado = null
    grafo.nodos.forEach((nodo)=>{
        let distancia = Math.sqrt(Math.pow((e.offsetX-nodo.getX()),2)+Math.pow((e.offsetY-nodo.getY()),2))
        // console.log(distancia)
        if(distancia<=radius){
            nodoEncontrado=nodo
        }
    })
    return nodoEncontrado
}

const getEdgeClick = (e)=>{
    let tolerance=5
    let aristaEncontrada = null
    grafo.aristas.forEach((arista)=>{
        var distancia = Math.abs((arista.nodoB.getY() - arista.nodoA.getY()) * e.offsetX - (arista.nodoB.getX() - arista.nodoA.getX()) * e.offsetY + arista.nodoB.getX() * arista.nodoA.getY() - arista.nodoB.getY() * arista.nodoA.getX()) / Math.sqrt((arista.nodoB.getY() - arista.nodoA.getX()) ** 2 + (arista.nodoB.getX() - arista.nodoA.getX()) ** 2);
        if(distancia <= tolerance){
            aristaEncontrada = arista
        }
    })
    return aristaEncontrada
}

const drawNode = (e)=>{
    if(grafo.nodos.length>0){
        idNodo=grafo.nodos[grafo.nodos.length-1].id+1
    }
    let nodoExistente = getNodoClick(e)
    if(nodoExistente) return; //Si se da click sobre un nodo o muy cerca
    grafo.agregarNodo(new Nodo(idNodo,e.offsetX,e.offsetY,colores[tipoNodo],tipoNodo))
    idNodo++
    requestAnimationFrame(drawAll);
}

const drawEdge = (e)=>{
    if(grafo.aristas.length>0){
        idArista=grafo.aristas[grafo.aristas.length-1].id+1
    }

    let nodo = getNodoClick(e)
    // console.log(nodo)

    if(nodo){
        if(!arista.includes(nodo)){
            arista.push(nodo)
        }
    }

    let isValidEdge = true

    if(arista.length==2){
        // console.log(arista)
        grafo.aristas.forEach((aristaL)=>{
            if(aristaL.nodoA.getId() == arista[0].getId() && aristaL.nodoB.getId()==arista[1].getId()){
                // console.log("Arista repetida")
                isValidEdge=false
            }
            else if(aristaL.nodoA.getId() == arista[1].getId() && aristaL.nodoB.getId()==arista[0].getId()){
                // console.log("Arista repetida")
                isValidEdge=false
            }
        })

        if(isValidEdge){
            arista[0].addVecino(arista[1])
            arista[1].addVecino(arista[0])
            const aristaN = new Arista(idArista,arista[0],arista[1],color,null)
            console.log(aristaN)
            grafo.agregarArista(aristaN)
            arista=[]
            idArista++
            requestAnimationFrame(drawAll);
        }
        else{
            arista=[]
        }
    }
}

const erase = (e)=>{
    let nodoBorrar = getNodoClick(e);
    if(nodoBorrar){
        //Borrar nodo como vecino
        nodoBorrar.vecinos.forEach((vecino)=>{
            vecino.vecinos = vecino.vecinos.filter((n)=>n.id!=nodoBorrar.id)
        })
        grafo.nodos = grafo.nodos.filter((nodo)=>nodo.getId()!==nodoBorrar.getId())
        grafo.aristas.forEach((arista)=>{
            if(arista.nodoA.getId()==nodoBorrar.getId()){
                arista.nodoA=null
            }
            if(arista.nodoB.getId()==nodoBorrar.getId()){
                arista.nodoB=null
            }
        })
        let listaAristasClon = []
        grafo.aristas.forEach((arista)=>{
            if(arista.nodoA!= null && arista.nodoB!=null){
                listaAristasClon.push(arista)
            }
        })
        grafo.aristas=listaAristasClon
    }
    else{
        let aristaBorrar = getEdgeClick(e)
        if(aristaBorrar){
            grafo.aristas = grafo.aristas.filter((arista)=>arista.getId()!==aristaBorrar.getId())
        }
    }
    requestAnimationFrame(drawAll);
}

const draw = (e)=>{
    // if(!isDrawing) return;

    if(toolActive=="node"){
        drawNode(e);
    }
    else if(toolActive=="edge"){
        drawEdge(e);
        requestAnimationFrame(drawAll);
    }
    else if(toolActive=="eraser"){
        erase(e);
    }
    // else if(toolActive=="eraser"){

    // }
}


const setToolActive = (tool)=>{
    toolActive=tool;
}

const startMove = (e)=>{
    if(toolActive=="move"){
        nodeMove = getNodoClick(e);
    }
}

const endMove = (e)=>{
    if(toolActive=="move"){
        nodeMove = null;
    }
}

const moveNode=(e)=>{

    if(nodeMove!=null && toolActive=="move"){
        nodeMove.setX(e.offsetX)
        nodeMove.setY(e.offsetY)
        requestAnimationFrame(drawAll);
    }
}



const changeCursor = (e)=>{
    if (toolActive === "move") {
        const nodoEncontrado = getNodoClick(e);
        if (nodoEncontrado) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }
    }
    if (toolActive === "eraser") {
        const nodoEncontrado = getNodoClick(e);
        const aristaEncontrada = getEdgeClick(e);
        if (nodoEncontrado || aristaEncontrada) {
            canvas.style.cursor = `url('img/eraser.svg'), auto`; // Reemplaza con la ruta a tu icono
        } else {
            canvas.style.cursor = "default";
        }
    }
}

const setCoordenadas = (e)=>{
    let divCoordenadas = document.querySelector('.coordenadas')
    divCoordenadas.innerHTML=''
    divCoordenadas.innerHTML=`
        <span>x: ${e.offsetX}</span>
        <span>y: ${e.offsetY}</span>
    `
}

export {startMove,endMove,moveNode,draw, changeCursor,setToolActive, drawAll, setTipoNodo,setCoordenadas,idArista}