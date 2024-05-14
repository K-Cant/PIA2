import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilPageRoutingModule } from './editar-perfil-routing.module';

import { EditarPerfilPage } from './editar-perfil.page';
import { ShareModule } from 'src/app/share/share.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilPageRoutingModule,
    ShareModule,
    RouterModule
  ],
  declarations: [EditarPerfilPage]
})
export class EditarPerfilPageModule {}
