import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn:'root'
})

export class NoAuthGuard implements CanActivate{

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = localStorage.getItem('user');
      return new Promise((resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if(!auth){
          resolve(true);
        }else{
          this.utilsSvc.routerLink('/main/home');
          resolve(false);
        }
      })
    });
  }
}
