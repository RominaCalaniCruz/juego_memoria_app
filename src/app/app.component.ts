import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import {  Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public router:Router
  ) {
    // this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('splash');
    });
    await SplashScreen.show({
      showDuration: 5000,
      autoHide: true,
    });
    await SplashScreen.hide();
  }
}
