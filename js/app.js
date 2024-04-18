import {startMove,endMove,moveNode,draw, changeCursor, setToolActive, drawAll,setTipoNodo,setCoordenadas} from './Paint'
import { iniciarApp, detenerApp,crearGrafoEjemplo,grafo,resetApp} from './main';


const divColorPick = document.querySelector('.color-pick')
const btnRun = document.querySelector('.btnRun')
const btnClear = document.querySelector('.clear')
const canvas = document.querySelector("canvas");
const tools = document.querySelectorAll('.tool');
const inputColor = document.querySelector('#color-picker')
const listNodes = document.querySelector('.listNodes')

let isActiveApp = false


listNodes.addEventListener('mouseover',(e)=>{
    listNodes.classList.remove('listNodesHidden')
    listNodes.classList.add('listNodesShow')
})

listNodes.addEventListener('mouseout',(e)=>{
    listNodes.classList.add('listNodesHidden')
    listNodes.classList.remove('listNodesShow')
})

listNodes.addEventListener('click',(e)=>{

    let boton = e.target;
    if(boton.classList.contains('circle')){
        boton=boton.parentElement;
    }
    console.log(boton.classList[0])
    setTipoNodo(boton.classList[0])
    listNodes.insertBefore(boton, listNodes.firstChild)
})


btnRun.addEventListener('click',(e)=>{
    if(grafo.aristas.length<2){
        alert("Debe seleccionar o crear un grafo")
        return;
    }
    let boton = null
    if(e.target.classList.contains('btnRun')){
        boton = e.target.querySelector('.fa-solid');
    }
    else if(e.target.classList.contains('fa-solid')){
        boton = e.target;
    }
    if(boton.classList.contains('fa-play')){
        boton.classList.remove('fa-play')
        boton.classList.add('fa-stop')
    }
    else if(boton.classList.contains('fa-stop')){
        boton.classList.remove('fa-stop')
        boton.classList.add('fa-play')
    }
    
    //Codigo iniciar programa
    if(!isActiveApp){
        iniciarApp()
        isActiveApp=true;
    }
    else{
        detenerApp();
        isActiveApp=false;
    }
})

btnClear.addEventListener('click',(e)=>{
    console.log("Click clear")
    resetApp()
})

tools.forEach((tool)=>{
    tool.addEventListener('click',(e)=>{
        let name = e.target.getAttribute('name');
        if(!name){
            name = e.target.parentElement.getAttribute('name')
            console.log(name)
        }

        if(!['color','clear'].includes(name)){
            setToolActive(name)
            tools.forEach((tool)=>{tool.classList.remove('active')})
            document.querySelector(`.${name}`).classList.add('active')
        }
    })
})

canvas.addEventListener('mousedown',startMove);
canvas.addEventListener('mouseup',endMove);
canvas.addEventListener('mousemove',moveNode);
canvas.addEventListener('mousemove',changeCursor);
canvas.addEventListener('mousemove',(e)=>setCoordenadas(e));
canvas.addEventListener('click',draw);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Llama a una función de dibujo o realiza otras operaciones relacionadas con el canvas aquí
    // Por ejemplo, para dibujar un rectángulo rojo que ocupe todo el canvas:
    requestAnimationFrame(drawAll)
}

window.onload = resizeCanvas;
window.onresize = resizeCanvas;


window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth
    canvas.height=canvas.offsetHeight
})

document.querySelectorAll('.example').forEach((example)=>{
    example.addEventListener('click',(e)=>{
        console.log('click ejemplo')
        let idEjemplo= parseInt(e.target.getAttribute('id'))
        crearGrafoEjemplo(idEjemplo)
        console.log(e.target.getAttribute('id'))
        console.log('click ejemplo')
    })
})