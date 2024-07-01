import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController); //para mostrar el error
  router = inject(Router);

  loading(){
    return this.loadingCtrl.create({spinner: 'crescent'});
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //enruta a cualquier pagina
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  guardarEnLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }


  getLocalStorage(key: string){
    const value = localStorage ? localStorage.getItem(key) : null;
    return value ? JSON.parse(value) : null;
    // return JSON.parse(localStorage.getItem(key));
  }

}
