import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { getFirestore, setDoc , doc , getDoc, addDoc, collection, collectionData, query, Timestamp} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { getAuth, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor() {
  }


  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);
  storage = inject(AngularFireStorage);

  async loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(getAuth(), email, password);

  }
  

  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //login
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email,user.password);
  }
  
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(),path),data);

  }
  addDocument(path: string, data: any){
    return addDoc(collection(getFirestore(),path),data);

  }
  guardarDatosJugador(nombre: string, tiempo: number, fecha: Timestamp, modo: string) {
    const datosJugador = {
      nombre,
      tiempo,
      fecha,
      modo
    };

    return this.firestore.collection('jugadores').add(datosJugador);
  }

  getCollectionData(path: string , collectionQuery?: any){
    const ref = collection(getFirestore(),path);
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
  }

  getJugadoresPorModo(modo: string): Observable<any[]> {
    return this.firestore.collection('jugadores', ref => ref.where('modo', '==', modo)).valueChanges();
  }
 
}
