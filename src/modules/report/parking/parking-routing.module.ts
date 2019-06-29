import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACLGuard } from '@delon/acl';
import { ParkingListComponent } from './parking-list/parking-list.component';

const routes: Routes = [
    { path: 'list', component: ParkingListComponent,canActivate: [ ACLGuard ],data: { guard: ['ADMIN', 'USER'],title: '停车报表-列表' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule { }
