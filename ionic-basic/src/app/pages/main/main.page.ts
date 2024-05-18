import { Component, OnInit, inject } from '@angular/core';
import{ Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    { title: 'Inicio', url: '/main/home', icon:'home-outline'},
    { title: 'Perfil', url: '/main/profile', icon:'person-outline'},
    { title: 'Tareas', url: '/tabs', icon:'person-outline'},
    { title: 'Editar Perfil', url: '/editar-perfil', icon:'person-outline'}


  ]

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  currentPath: string = '';

  async getCurrentLocation(){
    try{
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
    }catch(e){

    }
  }

  ngOnInit() {
    this.router.events.subscribe((event:any) => {

      if(event?.url) this.currentPath = event.url;
    })
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  signOut(){
    this.firebaseSvc.signOut();
  }
}
