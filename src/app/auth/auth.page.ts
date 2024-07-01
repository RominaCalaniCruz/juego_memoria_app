import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  ionicForm!: FormGroup;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  isPwd = false;

  constructor(public formBuilder: FormBuilder) {

   }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: ['', [
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.required,
        Validators.minLength(6)
      ]
      ],
    });
  }
  


  togglePwd() {
    this.isPwd = !this.isPwd;
  }

  // onSubmit() {
  //   if(this.ionicForm.invalid) {
  //     this.ionicForm.markAllAsTouched();
  //     return;
  //   }
  //   console.log(this.ionicForm.value);
  // }

  async login(){
    if(this.ionicForm.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc.signIn(this.ionicForm.value as User).then(res=>{
        console.log(res);

        this.getUserInfo(res.user.uid);

      }).catch(err=>{
        console.log(err);
        this.utilsSvc.presentToast({
          message: "El usuario no existe",
          duration: 2000,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
    console.log(this.ionicForm.value);
  }
  async getUserInfo(userId: string){
    if(this.ionicForm.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();
      let path = `users/${userId}`;
      this.firebaseSvc.getDocument(path).then( (user: any)=>{
        if(user!==null){

          this.utilsSvc.guardarEnLocalStorage('user', user);
          this.utilsSvc.routerLink('/home');
          this.ionicForm.reset();
  
          this.utilsSvc.presentToast({
            message: `¡Hola de nuevo ${user.name}!`,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline'
          });
        }
        console.log(user);


      }).catch(err=>{
        console.log(err);
        this.utilsSvc.presentToast({
          message: "Error al iniciar sesion",
          duration: 2000,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(()=>{
        loading.dismiss();
      })
    }
    console.log(this.ionicForm.value);
  }
  autocomplete(email:string, pass:string){
    this.ionicForm.get('email')?.setValue(email);
    this.ionicForm.get('password')?.setValue(pass);
  }
  borrar(){
    this.ionicForm.get('email')?.setValue("");
    this.ionicForm.get('password')?.setValue("");
  }

}
