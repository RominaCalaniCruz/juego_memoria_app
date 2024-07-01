import { Component, OnInit , AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Fireworks } from 'fireworks-js';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router:Router) { 
    setTimeout(()=>{
      this.router.navigateByUrl('auth');
    },2000);
  }

  ngOnInit() {
  }
}
