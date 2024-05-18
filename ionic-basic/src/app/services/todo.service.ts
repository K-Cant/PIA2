import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  URL = "https://6648a9e64032b1331bec0a0f.mockapi.io/Tarea";
  Tarea$ = new BehaviorSubject([]);
  Tarea = [];

  constructor(private http: HttpClient) { 
    this.lista().then( (r:any) => {
      this.Tarea = r;
      this.Tarea$.next( this.Tarea );
    });
  }

  async lista(){
    return await this.http.get(this.URL).toPromise().then( r => {
      return r;
    }).catch( e => console.log('Error al obtener los todos') );
  }

  async agregar(nuevaTarea){
    return await this.http.post(this.URL, nuevaTarea).toPromise().then( r => {
      this.Tarea.push(r);
      this.Tarea$.next( this.Tarea );
      return r;
    }).catch( e => console.log('Error al guardar la tarea') );
  }

  async actualizar(tarea){
    const url = this.URL + '/' + tarea.id;
    return await this.http.put(url, tarea).toPromise().then( r => {
      const index = this.Tarea.map( t => t.id).indexOf( tarea.id );
      this.Tarea[index] = tarea;
      this.Tarea$.next( this.Tarea );
      return r;
    }).catch( e => console.log('Error al actualizar la tarea') );
  }

  async eliminar(tarea){
    const url = this.URL + '/' + tarea.id;
    return await this.http.delete(url).toPromise().then( r => {
      const index = this.Tarea.map( t => t.id).indexOf( tarea.id );
      this.Tarea.splice( index , 1 );
      this.Tarea$.next( this.Tarea );
      return r;
    }).catch( e => console.log('Error al eliminar la tarea') );
  }
}