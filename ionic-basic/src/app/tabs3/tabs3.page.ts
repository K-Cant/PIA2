import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-tabs3',
  templateUrl: './tabs3.page.html',
  styleUrls: ['./tabs3.page.scss'],
})
export class Tabs3Page implements OnInit {

  constructor(private tareasService: TodoService) { }

  tareasCompletadas = [];
  ngOnInit(){
    this.tareasService.Tarea$.subscribe( _tareas => {
      this.tareasCompletadas = _tareas.filter( t => t.estado == true );
    });
  }

  async cambiarEstado(tarea){
    await this.tareasService.actualizar(tarea).then(r => { });
  }

  async eliminar(tarea){
    await this.tareasService.eliminar(tarea).then(r => { });
  }

  

}
