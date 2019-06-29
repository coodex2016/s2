import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamParkingComponent } from './stream-parking/stream-parking.component';
import { StreamFinanceComponent } from './stream-finance/stream-finance.component';
import { ACLGuard } from '@delon/acl';

const routes: Routes = [
    { path: 'finance', component: StreamFinanceComponent,canActivate: [ ACLGuard ],data: { guard: 'ADMIN',title: '财务流水' }},
    { path: 'parking', component: StreamParkingComponent,canActivate: [ ACLGuard ],data: { guard: ['ADMIN', 'USER'],title: '停车流水' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamRoutingModule { }
