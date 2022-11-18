import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { PageRoutingModule } from './page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CardPlayerComponent } from '../components/cardPlayer/card-player.component';
import { ModalComponent } from '../components/modal/modal.component';



@NgModule({
  declarations: [
    PageComponent,
    CardPlayerComponent,
    ModalComponent,
    PageComponent ],
    
  imports: [
    CommonModule,
    PageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PageModule { }
