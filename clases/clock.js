class Reloj {
    constructor() {
      this.intervalo = 1000; // Intervalo en milisegundos
      this.tiempo = 0; // Tiempo actual
      this.pausado = false; // Estado del reloj
    }
  
    iniciar() {
      this.intervalId = setInterval(() => {
        if (!this.pausado) {
          this.tiempo += this.intervalo;
          this.ejecutarMetodos();
        }
      }, this.intervalo);
    }
  
    ejecutarMetodos() {
      // Metodos en cada ciclo de reloj
      console.log(`Tiempo: ${this.tiempo / 1000} segundos`);
    }
    acelerar() {
      this.intervalo /= 2;
      this.reiniciarIntervalo();
    }
    reducir() {
      this.intervalo *= 2;
      this.reiniciarIntervalo();
    }
    pausar() {
      this.pausado = true;
    }
    continuar() {
      this.pausado = false;
    }
  
    adelantar(segundos) {
      this.tiempo += segundos * 1000;
    }
  
    retroceder(segundos) {
      this.tiempo -= segundos * 1000;
      if (this.tiempo < 0) this.tiempo = 0;
    }
  
    reiniciarIntervalo() {
      clearInterval(this.intervalId);
      this.iniciar();
    }
}