import { Component, OnInit, inject } from '@angular/core';
import { entry } from 'src/app/models/entrys.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateDiaryyComponent } from 'src/app/share/components/add-update-diaryy/add-update-diaryy.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  entrys: entry[] = [];


  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getEntry();
  }

  //obtener entradas
  getEntry() {
    let path = `users/${this.user().uid}/entrys`
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.entrys = res;
        sub.unsubscribe();
      }
    })
  }

  //cerrarsesion
  signOut(){
    this.firebaseSvc.signOut();
  }

  //agregar o act entrada
  async addUpdateEntry(Entry?: entry){
    let success = await this.utilsSvc.presentModal({
      component: AddUpdateDiaryyComponent,
      cssClass: 'add-update-modal',
      componentProps: { Entry }
    })

    if(success) this.getEntry();
  }

  async confirmDeleteProduct(Entry: entry) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar',
      message: '¿Deseas eliminar?',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Sí, deseo eliminar',
          handler: () => {
            this.eliminarEntrada(Entry)
          }
        }
      ]
    });
  }

  async eliminarEntrada(Entry: entry) {
    let path = `users/${this.user().uid}/entrys/${Entry.id}`

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = await this.firebaseSvc.getFilePath(Entry.image);
    await this.firebaseSvc.deleteFile(imagePath);

    this.firebaseSvc.deleteDocument(path).then(async res => {
      this.entrys = this.entrys.filter(e => e.id !== Entry.id);

      this.utilsSvc.presentToast({
        message: 'Entrada eliminada con éxito',
        duration: 2000,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })
    }).catch(error =>{
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 3500,
        color: 'warning',
        position: 'middle',
        icon: 'alert-circle-outline'
      })
    }).finally(()=> {
      loading.dismiss();
    })
  }

}
