import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoModuleRoutingModule } from './demo-module-routing.module';
import { DemoComponentComponent } from './demo-component/demo-component.component';

@NgModule({
  declarations: [DemoComponentComponent],
  imports: [
    CommonModule,
    DemoModuleRoutingModule
  ]
})
export class DemoModuleModule { }
