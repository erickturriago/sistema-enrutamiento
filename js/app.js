import {startMove,endMove,moveNode,draw, changeCursor, setToolActive} from './Paint'
import { iniciarApp, detenerApp } from './main';


const divColorPick = document.querySelector('.color-pick')
const btnRun = document.querySelector('.btnRun')
const canvas = document.querySelector("canvas");
const tools = document.querySelectorAll('.tool');
const inputColor = document.querySelector('#color-picker')
let isActiveApp = false


btnRun.addEventListener('click',(e)=>{
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

tools.forEach((tool)=>{
    tool.addEventListener('click',(e)=>{
        let name = e.target.getAttribute('name');
        if(!name){
            name = e.target.parentElement.getAttribute('name')
            console.log(name)
        }

        if(name!='color'){
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
canvas.addEventListener('click',draw);

inputColor.addEventListener('input',(e)=>{
    divColorPick.style.backgroundColor = e.target.value
    color=e.target.value
})


window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth
    canvas.height=canvas.offsetHeight
})