import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage {

  busy: boolean = false;


  nuevac: string;
  nuevoe: string;
  c: string;
  e: string;
  up: AngularFirestoreDocument

  constructor(
    private afs: AngularFirestore,
    private us: UtilsService,
    private alct: AlertController,
    private fbs: FirebaseService
  ) { }



  async presentAlert(title: string, content: string){
    const alert = await this.alct.create({
      header: title,
      message: content,
      buttons: ['Ok']
    })
    await alert.present()
  }

  async actualizar(): Promise<void> {
    if (!this.nuevoe) {
      await this.presentAlert('Error', 'Ingrese un correo nuevo');
    }
    if (!this.e) {
      await this.presentAlert('Error', 'Ingrese el correo actual');
    }
    if (!this.c) {
      await this.presentAlert('Error', 'Ingrese la contraseña actual');
    }

    if (this.nuevoe === this.e) {
      await this.presentAlert('Error', 'El nuevo correo electrónico debe ser diferente al correo electrónico actual');
    }

    this.busy = true;

    try {
      try {
        await this.fbs.updateUserEmail(this.nuevoe, this.c, this.e);
        this.presentAlert('Éxito', 'El correo electrónico se ha actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar el correo electrónico:', error);
        this.presentAlert('Error', 'No se pudo actualizar el correo electrónico');
      }
    } finally {
      this.busy = false;
    }
  }

    }
