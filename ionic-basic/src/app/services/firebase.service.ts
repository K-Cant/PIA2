import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  //auth
  //acceder
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  //crear
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //act usuario
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName})
  }

  //restablecer contra
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email);
  }

  //BD
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}