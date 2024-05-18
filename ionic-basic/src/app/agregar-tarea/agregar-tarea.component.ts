import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.scss'],
})
export class AgregarTareaComponent implements OnInit {
  nuevaTarea = { name: '', description: '' };

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  agregar(){
    if (this.nuevaTarea.name != '' && this.nuevaTarea.description != ''){
      this.modal.dismiss({nuevaTarea: this.nuevaTarea});
    }
  }

}
