import { Component, OnInit, inject } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-modo-facil',
  templateUrl: './modo-facil.page.html',
  styleUrls: ['./modo-facil.page.scss'],
})
export class ModoFacilPage implements OnInit {

  estaJugando = true;
  minutes: number = 0;
  seconds: number = 0;
  segTotales:number = 0;
  resultadosLoading = false;
  audio = new Audio();
  rutaAudio = '../../assets/audios/facil_audio.mp3';
  private interval: any;
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  user = this.utilsSvc.getLocalStorage('user');
  totalPairs: number = 3;
  images: string[] = [
    '../../assets/imgs/gato.png',
    '../../assets/imgs/snake.png',
    '../../assets/imgs/dog.png'
  ];

  cards: any[] = [];
  selectedCards: any[] = [];
  currentMove: number = 0;
  currentAttempts: number = 0;
  pairsFound: number = 0;

  constructor(private alertController: AlertController) {
    this.audio.src = this.rutaAudio;
    this.audio.play();
    this.audio.volume = 0.1;
    this.audio.loop = true;
  }
  ngOnInit() {

    this.startTimer();
    this.generateCards();
  }

  async abandonarPartida() {
    if(this.estaJugando){

      const alert = await this.alertController.create({
        header: 'Abandonar partida',
        message: '¿Está seguro de que quiere salir? Perdera su progreso.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'boton-cancelar',
            handler: () => {
              console.log('Eliminación de saldo cancelada');
            }
          }, {
            text: 'Salir',
            cssClass: 'boton-eliminar',
            handler: () => {
              console.log('Saldo eliminado');
              this.audio.pause();
              this.audio.currentTime = 0;
              this.utilsSvc.guardarEnLocalStorage('estado', {estado: false});
              this.utilsSvc.routerLink('/home/menu');
            }
          }
        ]
      });
  
      await alert.present();
    }
    else{
      this.utilsSvc.guardarEnLocalStorage('estado', {estado: false});
      this.utilsSvc.routerLink('/home/menu');
    }

  }
  generateCards(): void {
    let selectedImages = this.images.slice(0, this.totalPairs).concat(this.images.slice(0, this.totalPairs)); // Duplica las imágenes
    selectedImages.sort(() => Math.random() - 0.5); // Mezcla las imágenes

    for (let i = 0; i < this.totalPairs * 2; i++) {
      this.cards.push({ id: i, image: selectedImages[i], active: false });
    }
  }
  reiniciar(){
    this.resultadosLoading = true;
    // this.audio.play();
    this.utilsSvc.guardarEnLocalStorage('estado', {estado: true});
    setTimeout(() => {
      this.audio.play();
      this.resultadosLoading = false;
      this.estaJugando = true;
      this.startTimer();
      this.selectedCards = [];
      this.cards = [];
      this.generateCards();
      this.pairsFound = 0;
      this.segTotales = 0;
    }, 1500);
  }
  activate(card: any): void {
    if (this.currentMove < 2 && !card.active) {
      card.active = true;
      this.selectedCards.push(card);

      if (++this.currentMove === 2) {
        this.currentAttempts++;
        if (this.selectedCards[0].image === this.selectedCards[1].image) {
          this.pairsFound++;
          this.selectedCards = [];
          this.currentMove = 0;
          if (this.pairsFound === this.totalPairs) {
            console.log('¡Has ganado!');
            this.audio.pause();
            this.audio.currentTime = 0;
            this.resultadosLoading = true;
            this.segTotales = this.minutes*60 + this.seconds;
            const fecha = Timestamp.fromDate(new Date())
            this.firebaseSvc.guardarDatosJugador(this.user.name, this.segTotales , fecha , 'facil');
            this.utilsSvc.guardarEnLocalStorage('estado', {estado: false});
            this.stopTimer();
            setTimeout(() => {
              this.resultadosLoading = false;
              this.estaJugando = false;
            }, 1500);
          }
        } else {
          setTimeout(() => {
            this.selectedCards.forEach(c => c.active = false);
            this.selectedCards = [];
            this.currentMove = 0;
          }, 1000);
        }
      }
    }
  }

  startTimer() {
    this.minutes = 0;
    this.seconds = 0;

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.seconds++;

      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
    }, 1000);
  }
  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log(`Tiempo transcurrido: ${this.minutes} minutos y ${this.seconds} segundos`);
    }
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      
    }
    this.audio.pause();
    this.audio.currentTime = 0;
    this.utilsSvc.guardarEnLocalStorage('estado', {estado: false});
  }
}
