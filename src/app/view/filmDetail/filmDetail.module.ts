import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

import { filmDetailPage } from './filmDetail.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: filmDetailPage
      }
    ])
  ],
  declarations: [filmDetailPage]
})
export class filmDetailPageModule {}
