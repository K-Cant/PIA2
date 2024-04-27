import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { entry } from 'src/app/models/entrys.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-diaryy',
  templateUrl: './add-update-diaryy.component.html',
  styleUrls: ['./add-update-diaryy.component.scss'],
})
export class AddUpdateDiaryyComponent  implements OnInit {

  @Input() Entry: entry

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    titulo: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;

  ngOnInit() {
    this.user=this.utilsSvc.getFromLocalStorage('user');
    if (this.Entry) this.form.setValue(this.Entry);
  }

  //tomar/seleccionar imagenes
  async TakeImage(){
    const dataUrl = (await this.utilsSvc.takePicture('Imagen del Producto')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  submit(){
    if(this.form.valid){
      if(this.Entry) this.actEntrada();
      else this.crearEntrada();
    }

  }

  async crearEntrada() {
      let path = `users/${this.user.uid}/entrys`

      const loading = await this.utilsSvc.loading();
      await loading.present();

      //subir imagen y obtener url
      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      delete this.form.value.id;

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {
        this.utilsSvc.dismissModal({ success: true});
        this.utilsSvc.presentToast({
          message: 'Entrada subida con éxito',
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

  async actEntrada() {
      let path = `users/${this.user.uid}/entrys/${this.Entry.id}`

      const loading = await this.utilsSvc.loading();
      await loading.present();

      if(this.form.value.image !== this.Entry.image){
        let dataUrl = this.form.value.image;
        let imagePath = await this.firebaseSvc.getFilePath(this.Entry.image);
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
        this.form.controls.image.setValue(imageUrl);
      }

      delete this.form.value.id;

      this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {
        this.utilsSvc.dismissModal({ success: true});
        this.utilsSvc.presentToast({
          message: 'Entrada actualizada con éxito',
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
