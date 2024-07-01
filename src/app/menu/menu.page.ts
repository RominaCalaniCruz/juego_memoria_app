import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  modoElegido: string ='facil';
  estaJugando: boolean = false;
  utilsSvc = inject(UtilsService);
  jugarLoading = false;
  audio = new Audio();
  rutaAudio = '../../assets/audios/menu.mp3';
  constructor() {
    this.audio.src = this.rutaAudio;
    this.audio.play();
    this.audio.loop = true;
    this.audio.volume = 0.1;
  }

  ngOnInit() {
    console.log(`Selected Value: ${this.modoElegido}`);

  }


  onRadioGroupChange(event: any) {
    this.modoElegido = event.detail.value;
    console.log(`Selected Value: ${this.modoElegido}`);
  }



  jugar(){
    
    this.estaJugando = true;
    this.jugarLoading = true;
setTimeout(() => {
  this.jugarLoading = false;
  this.utilsSvc.guardarEnLocalStorage('estado', {estado: this.estaJugando});
  // this.datosService.setValor(this.estaJugando);
  switch (this.modoElegido) {
      case "facil":
        this.utilsSvc.routerLink('/home/modo-facil');
        break;
      case "medio":
        this.utilsSvc.routerLink('/home/modo-medio');
        break;
      case "dificil":
        this.utilsSvc.routerLink('/home/modo-dificil');
        break;
  }
  this.audio.pause();
  this.audio.currentTime = 0;
}, 1500);
    
  }


  ngOnDestroy(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
  

}
