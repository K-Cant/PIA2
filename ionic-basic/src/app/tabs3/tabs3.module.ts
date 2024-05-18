import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tabs3PageRoutingModule } from './tabs3-routing.module';

import { Tabs3Page } from './tabs3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tabs3PageRoutingModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tabs3Page }])
  ],
  declarations: [Tabs3Page]
})
export class Tabs3PageModule {}
