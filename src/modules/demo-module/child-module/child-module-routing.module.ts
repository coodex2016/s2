import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACLGuard } from '@delon/acl';
import { ListComponent } from '@module/demo-module/child-module/list/list.component';

const routes: Routes = [
    { path: 'list', component: ListComponent,
        canActivate: [ ACLGuard ],data: { guard: 'ADMIN',title: '演示child-demo-列表' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildModuleRoutingModule { }

export const ROUTERCOMPONENTS =[ListComponent]
