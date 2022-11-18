import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardPlayerComponent } from '../components/cardPlayer/card-player.component';
import { ModalComponent } from '../components/modal/modal.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'add-player',
                component: ModalComponent
            },
            {
                path: 'edit-player/:id',  
                component: ModalComponent
            },
            {
                path: 'player',
                component: CardPlayerComponent
            },
            {
                path:'**',
                redirectTo: 'home'
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class  PageRoutingModule {
}