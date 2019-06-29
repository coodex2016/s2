import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACLGuard } from '@delon/acl';

const routes: Routes = [
    // { path: 'finance', loadChildren: 'src/modules/report/finance/finance.module#FinanceModule',canActivate: [ ACLGuard ],data: { guard: 'ADMIN',title: '财务报表' }},
    // { path: 'parking', loadChildren: 'src/modules/report/parking/parking.module#ParkingModule',canActivate: [ ACLGuard ],data: { guard: ['ADMIN', 'USER'],title: '停车报表' }},
    { path: 'finance', loadChildren: './finance/finance.module#FinanceModule',canActivate: [ ACLGuard ],data: { guard: 'ADMIN',title: '财务报表' }},
    { path: 'parking', loadChildren: './parking/parking.module#ParkingModule',canActivate: [ ACLGuard ],data: { guard: ['ADMIN', 'USER'],title: '停车报表' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
