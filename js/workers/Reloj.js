self.onmessage = function(e){
    let contador = 0;
    console.log(e)
    if(e.data.cmd == 'iniciarReloj'){
        setInterval(() => {
            contador++
            console.log(contador)
            if(contador%5==0){
                self.postMessage('editNodes');
            }
            self.postMessage('dibujar');
        }, e.data.timeOut);
    }
};

export default self