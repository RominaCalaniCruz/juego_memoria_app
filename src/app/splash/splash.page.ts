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
  // ngAfterViewInit() {
  //   const container = document.getElementById('fireworks-container');
  //   if (container) {
  //     const fireworks = new Fireworks(container, {
  //       autoresize: true,
  //       opacity: 0.5,
  //       acceleration: 1.02,
  //       friction: 0.97,
  //       gravity: 1.5,
  //       particles: 10,
  //       traceLength: 3,
  //       traceSpeed: 10,
  //       explosion: 5,
  //       intensity: 20,
  //       flickering: 50,
  //       lineStyle: 'round',
  //       hue: {
  //         min: 0,
  //         max: 360
  //       },
  //       delay: {
  //         min: 15,
  //         max: 30
  //       },
  //       rocketsPoint: {
  //         min: 50,
  //         max: 50
  //       },
  //       lineWidth: {
  //         explosion: {
  //           min: 1,
  //           max: 4
  //         },
  //         trace: {
  //           min: 0.10,
  //           max: 1
  //         }
  //       },
  //       brightness: {
  //         min: 50,
  //         max: 80
  //       },
  //       decay: {
  //         min: 0.015,
  //         max: 0.03
  //       },
  //       boundaries: {
  //         x: 50,
  //         y: 50,
  //         width: container.clientWidth,
  //         height: container.clientHeight
  //       },
  //       sound: {
  //         enabled: false,
  //         files: [
  //           '../assets/sounds/explosion0.mp3',
  //           '../assets/sounds/explosion1.mp3',
  //           '../assets/sounds/explosion2.mp3'
  //         ],
  //         volume: {
  //           min: 4,
  //           max: 8
  //         }
  //       }
  //     });

  //     fireworks.start();
  //   }
  // }
}
