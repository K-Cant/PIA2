import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-tabs2',
  templateUrl: './tabs2.page.html',
  styleUrls: ['./tabs2.page.scss'],
})
export class Tabs2Page implements OnInit {

  constructor(private tareasService: TodoService) { }

  tareasPendiente = [];
  ngOnInit(){
    this.tareasService.Tarea$.subscribe( _tareas => {
      console.log('Lista de tareas en tab 2', _tareas);
      this.tareasPendiente = _tareas.filter( t => t.estado == false );
    });
  }

  async cambiarEstado(tarea){
    await this.tareasService.actualizar(tarea).then(r => { });
  }

  async eliminar(tarea){
    await this.tareasService.eliminar(tarea).then(r => { });
  }




}
