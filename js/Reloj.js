self.onmessage = function(e){
    if(e.data.cmd === 'iniciarReloj'){
        let contador = 0;
        const intervalID = setInterval(() => {
            console.log(contador);
            contador++;
        }, e.data.timeOut);

        // Para detener el temporizador si es necesario
        self.onmessage = function(e) {
            if (e.data.cmd === 'detenerReloj') {
                clearInterval(intervalID);
            }
        };
    }
};

export default self;