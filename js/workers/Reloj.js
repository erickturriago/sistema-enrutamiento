self.onmessage = function(e){
    let contador = 0;
    if(e.data.cmd == 'iniciarReloj'){
        console.log("Inicia reloj")
        setInterval(() => {
            contador++
            console.log(contador)
            if(contador%5==0){
                self.postMessage('editNodes');
                // self.postMessage('avanzarPaquetes');
            }
            else{
                self.postMessage('avanzarPaquetes');
            }
            self.postMessage('dibujar');
        }, e.data.timeOut);
    }
};

export default self