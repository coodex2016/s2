import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildModuleRoutingModule,ROUTERCOMPONENTS } from './child-module-routing.module';
const COMPONENTS=[...ROUTERCOMPONENTS]
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ChildModuleRoutingModule
  ]
})
export class ChildModuleModule { }
