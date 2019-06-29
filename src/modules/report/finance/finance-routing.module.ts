import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACLGuard } from '@delon/acl';
import { FinanceListComponent } from './finance-list/finance-list.component';

const routes: Routes = [
    { path: 'list', component: FinanceListComponent,canActivate: [ ACLGuard ],data: { guard: 'ADMIN',title: '财务报表-列表' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
