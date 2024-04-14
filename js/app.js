import Arista from "../clases/Arista"
import Nodo from "../clases/Nodo"

const inputColor = document.querySelector('#color-picker')
console.log(inputColor)
const divColorPick = document.querySelector('.color-pick')

inputColor.addEventListener('input',(e)=>{
    // console.log(e.target.value)
    divColorPick.style.backgroundColor = e.target.value
    color=e.target.value
})

let listaNodos = []
let listaAristas = []

const tools = document.querySelectorAll('.tool');
const canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');


let isDrawing = false,
brushWidth = 5,
color="#000",
toolActive=undefined,
radius = 30,
arista = [],
idNodo=1,
idArista=1,
nodeMove=null


window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth
    canvas.height=canvas.offsetHeight
})


const drawAll=()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    listaAristas.forEach((arista)=>{
        ctx.lineWidth=brushWidth;
        ctx.strokeStyle = arista.color;
        ctx.beginPath(); // Iniciar un nuevo camino de dibujo
        ctx.moveTo(arista.nodoA.getX(), arista.nodoA.getY()); // Mover el lápiz al punto A
        ctx.lineTo(arista.nodoB.getX(), arista.nodoB.getY()); // Dibujar una línea hasta el punto B
        ctx.stroke(); // Dibujar la lín
    })

    listaNodos.forEach((nodo)=>{
        ctx.beginPath();
        ctx.lineWidth=brushWidth
        ctx.strokeStyle = nodo.color;
        ctx.fillStyle=nodo.color;
        ctx.arc(nodo.getX(), nodo.getY(), radius, 0, 2 * Math.PI);
        ctx.stroke()
        ctx.fill()

        ctx.font = '40px Arial'; // Fuente y tamaño
        ctx.fillStyle = 'white'; // Color del texto
        ctx.fillText(nodo.getId(), nodo.getX()-12, nodo.getY()+12);
    })
}

const getNodoClick = (e)=>{
    let nodoEncontrado = null
    listaNodos.forEach((nodo)=>{
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
    listaAristas.forEach((arista)=>{
        var distancia = Math.abs((arista.nodoB.getY() - arista.nodoA.getY()) * e.offsetX - (arista.nodoB.getX() - arista.nodoA.getX()) * e.offsetY + arista.nodoB.getX() * arista.nodoA.getY() - arista.nodoB.getY() * arista.nodoA.getX()) / Math.sqrt((arista.nodoB.getY() - arista.nodoA.getX()) ** 2 + (arista.nodoB.getX() - arista.nodoA.getX()) ** 2);
        if(distancia <= tolerance){
            aristaEncontrada = arista
        }
    })
    return aristaEncontrada
}

const drawNode = (e)=>{
    let nodoExistente = getNodoClick(e)
    if(nodoExistente) return; //Si se da click sobre un nodo o muy cerca
    listaNodos.push(new Nodo(idNodo,e.offsetX,e.offsetY,color))
    idNodo++
    requestAnimationFrame(drawAll);
}

const drawEdge = (e)=>{
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
        listaAristas.forEach((aristaL)=>{
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
            listaAristas.push(new Arista(idArista,arista[0],arista[1],color))
            arista=[]
            idArista++
            requestAnimationFrame(drawAll);
        }
        else{
            arista=[]
        }
        console.log(`Total aristas: ${listaAristas.length}`)
    }
}

const erase = (e)=>{
    let nodoBorrar = getNodoClick(e);
    if(nodoBorrar){
        console.log("Borrar nodo")
        listaNodos = listaNodos.filter((nodo)=>nodo.getId()!==nodoBorrar.getId())
        listaAristas.forEach((arista)=>{
            if(arista.nodoA.getId()==nodoBorrar.getId()){
                arista.nodoA=null
            }
            if(arista.nodoB.getId()==nodoBorrar.getId()){
                arista.nodoB=null
            }
        })
        console.log(listaAristas)
        let listaAristasClon = []
        listaAristas.forEach((arista)=>{
            if(arista.nodoA!= null && arista.nodoB!=null){
                listaAristasClon.push(arista)
            }
        })
        listaAristas=listaAristasClon
        console.log(listaAristas)
    }
    else{
        console.log("Borrar arista")
        let aristaBorrar = getEdgeClick(e)
        if(aristaBorrar){
            listaAristas = listaAristas.filter((arista)=>arista.getId()!==aristaBorrar.getId())
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

const startMove = (e)=>{
    if(toolActive=="move"){
        nodeMove = getNodoClick(e);
        console.log(nodeMove)
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

tools.forEach((tool)=>{
    tool.addEventListener('click',(e)=>{
        let name = e.target.getAttribute('name');
        if(!name){
            name = e.target.parentElement.getAttribute('name')
            console.log(name)
        }


        if(name!='color'){
            toolActive=name
            tools.forEach((tool)=>{tool.classList.remove('active')})
            document.querySelector(`.${toolActive}`).classList.add('active')
        }
    })
})

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

canvas.addEventListener('mousedown',startMove);
canvas.addEventListener('mouseup',endMove);
canvas.addEventListener('mousemove',moveNode);
canvas.addEventListener('mousemove',changeCursor);
canvas.addEventListener('click',draw)