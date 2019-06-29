import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponentComponent } from './demo-component/demo-component.component';
import { ACLGuard } from '@delon/acl';
const routes: Routes = [
    { path: '', component: DemoComponentComponent,canActivate: [ ACLGuard ],data: {guard: ['ADMIN','USER'], title: '演示demo' }},
    { path: 'child',loadChildren: () => import('./child-module/child-module.module').then(m => m.ChildModuleModule),
        canLoad: [ ACLGuard ],  data: {guard:  'USER', title: '演示child-demo' }},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoModuleRoutingModule { }
