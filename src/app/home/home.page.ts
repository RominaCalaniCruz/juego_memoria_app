import { Component, inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  valorLocalStorage: any;
  estaJugando: boolean =false ;

  constructor(private alertController: AlertController) {
    // console.log(this.estaJugando);
    this.utilsSvc.guardarEnLocalStorage('estado',{estado: this.estaJugando});

    this.valorLocalStorage =this.utilsSvc.getLocalStorage('estado');
    this.estaJugando = this.utilsSvc.getLocalStorage('estado')
    console.log(this.valorLocalStorage);
  }

  ngOnInit() {
    
  }
  verPuntaje(){
    this.estaJugando = this.utilsSvc.getLocalStorage('estado').estado;
    if(this.estaJugando){
      this.abandonarPartida('mejores');
    }
    else{
      this.utilsSvc.routerLink('home/mejores');
    }
  }
  async abandonarPartida(ruta:string) {
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
            if(ruta=='mejores'){

              this.utilsSvc.routerLink(`/home/${ruta}`);
            }
            else{
              this.cerrarSesionFinal();
            }
            this.utilsSvc.guardarEnLocalStorage('estado', {estado: false});
          }
        }
      ]
    });

    await alert.present();
  }
  cerrarSesionFinal(){
    this.utilsSvc.presentToast({
      message: '¡Vuelve a jugar pronto!',
      duration: 1600,
      color: 'primary',
      position: 'middle'
    });
    this.firebaseSvc.signOut();
  }
  cerrarSesion(){
    this.estaJugando = this.utilsSvc.getLocalStorage('estado').estado;
    if(this.estaJugando){
      this.abandonarPartida('salir');
    }
    else{
      this.cerrarSesionFinal();
    }
    // const loading = await this.utilsSvc.loading();
    // await loading.present();
    
  }
  
  
}
