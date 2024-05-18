import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ShareModule } from 'src/app/share/share.module';

import { IonicModule } from '@ionic/angular';

import { Tabs1PageRoutingModule } from './tabs1-routing.module';

import { Tabs1Page } from './tabs1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tabs1PageRoutingModule,
    ExploreContainerComponentModule,
    ShareModule
  ],
  declarations: [Tabs1Page]
})
export class Tabs1PageModule {}
