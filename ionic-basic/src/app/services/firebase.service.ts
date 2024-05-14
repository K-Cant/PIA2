import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, updatePassword, updateEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  utilsSvc = inject(UtilsService);

  private user: User;


	constructor(private afAuth: AngularFireAuth) {

	}

	getName(): string {
		return this.user.name
  }

  updateUserEmail(newEmail: string, password:string, oldEmail:string){
    return this.afAuth.signInWithEmailAndPassword(oldEmail, password).then(userCredentials => {
                return userCredentials.user.updateEmail(newEmail);
    })
}

  updateCon(NewPassword:string, password:string ,Email:string){
    return this.afAuth.signInWithEmailAndPassword(Email, password).then(userCredentials => {
                return userCredentials.user.updatePassword(NewPassword);
  })
}


  //auth
  getAuth(){
    return getAuth();
  }

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

  //cerrarsesion
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

  //BD
  //obtener doc de la collection
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
  }

  //set doc
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

    //act doc
  updateDocument(path: string, data: any){
    return updateDoc(doc(getFirestore(), path), data);
  }

  //eliminar doc
  deleteDocument(path: string){
    return deleteDoc(doc(getFirestore(), path));
  }

  //obtener doc
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //agregar doc
  addDocument(path: string, data: any){
    return addDoc(collection(getFirestore(), path), data);
  }

  //almacenamiento
  //subir imagen
  async uploadImage(path: string, data_url: string){
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }

  //obtener ruta img con url
  async getFilePath(url: string){
    return ref(getStorage(), url).fullPath
  }

  //eliminar entrada
  deleteFile(path: string){
    return deleteObject(ref(getStorage(), path));
  }

}
