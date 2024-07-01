import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Timestamp } from 'firebase/firestore';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-mejores',
  templateUrl: './mejores.page.html',
  styleUrls: ['./mejores.page.scss'],
})
export class MejoresPage implements OnInit {
  jugadores: any[] = [];
  selectedMode: string = 'facil';
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  constructor() { }
  jugadoresFacil : any[] = [];
  topFacil :  any[] = [];
  topDif :  any[] = [];
  topMed:  any[] = [];
  jugadoresMedio : any[] = [];
  jugadoresDificil : any [] = [];
  loadingF = true;
  loadingM = true;
  loadingD = true;
  audio = new Audio();
  rutaAudio = '../../assets/audios/menu.mp3';
  ngOnInit() {
    this.filtrarJugadoresFacil();
    this.filtrarJugadoresMedio();
    this.filtrarJugadoresDificil();
    console.log(this.jugadoresFacil);
    this.audio.src = this.rutaAudio;
    this.audio.play();
    this.audio.loop = true;
    this.audio.volume = 0.1;

    
    // this.jugadoresDificil = this.filtrarJugadores('dificil');
    // console.log(this.jugadoresDificil);
    
    // this.jugadoresMedio = this.filtrarJugadores('medio');
    // console.log(this.jugadoresMedio);
    
  }

  menu(){
    this.utilsSvc.routerLink('/home/menu');
  }

  filtrarJugadoresFacil()  {
    this.firebaseSvc.getJugadoresPorModo('facil')
      .subscribe((jugadores: any[]) => {
        this.jugadoresFacil = jugadores.map((jug: any)=>({
          ...jug,
          fechaForm: this.formatTimestamp(jug.fecha),
          tiempoForm: this.calcularTiempo(jug.tiempo),
        }));
        this.jugadoresFacil.sort((a,b)=>a.tiempo - b.tiempo);
        this.topFacil = this.jugadoresFacil.slice(0,5);
        this.loadingF = false;
        // this.jugadores = jugadores;
        console.log(this.jugadoresFacil);
        // return jugadores;
      });
  }

  filtrarJugadoresMedio()  {
    this.firebaseSvc.getJugadoresPorModo('intermedio')
      .subscribe((jugadores: any[]) => {
        this.jugadoresMedio = jugadores.map((jug: any)=>({
          ...jug,
          fechaForm: this.formatTimestamp(jug.fecha),
          tiempoForm: this.calcularTiempo(jug.tiempo),
        }));
        this.jugadoresMedio.sort((a,b)=>a.tiempo - b.tiempo);
        this.topMed = this.jugadoresMedio.slice(0,5);
        this.loadingM = false;
        // this.jugadores = jugadores;
        console.log(this.jugadoresMedio);
        // return jugadores;
      });
  }
  filtrarJugadoresDificil()  {
    this.firebaseSvc.getJugadoresPorModo('dificil')
      .subscribe((jugadores: any[]) => {
        this.jugadoresDificil = jugadores.map((jug: any)=>({
          ...jug,
          fechaForm: this.formatTimestamp(jug.fecha),
          tiempoForm: this.calcularTiempo(jug.tiempo),
          
        }));
        this.jugadoresDificil.sort((a,b)=>a.tiempo - b.tiempo);
        this.topDif = this.jugadoresDificil.slice(0,5);
        // this.jugadores = jugadores;
        this.loadingD = false;
        console.log(this.jugadoresDificil);
        // return jugadores;
      });
  }

  calcularTiempo(segundos : number){
    let formatoFinal = '';
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    if(minutos != 0){
      if(segundosRestantes == 0){
        formatoFinal = minutos + ' min'
      }
      else{
        formatoFinal = minutos + ' min ' + segundosRestantes + ' seg'
      }

    }
    else{
      formatoFinal = segundos + ' seg'
    }
    return formatoFinal;
  }

  formatTimestamp(timestamp: Timestamp | undefined): string {
    if (!timestamp) {
      return ''; // Devolver una cadena vacía si el timestamp es undefined
    }
  
    // Convertir el Timestamp en un objeto Date
    const date = timestamp.toDate();
    // Obtener los componentes de la fecha
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Añade un cero al principio si es necesario
  const day = date.getDate().toString().padStart(2, '0'); // Añade un cero al principio si es necesario
  const hours = date.getHours().toString().padStart(2, '0'); // Añade un cero al principio si es necesario
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Añade un cero al principio si es necesario
  // Formatear la fecha en una cadena legible
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.audio.pause();
  this.audio.currentTime = 0;
  }

}
