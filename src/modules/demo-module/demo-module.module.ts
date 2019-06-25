import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoModuleRoutingModule } from './demo-module-routing.module';
import { DemoComponentComponent } from './demo-component/demo-component.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [DemoComponentComponent],
  imports: [
    CommonModule,
    DemoModuleRoutingModule,
      SharedModule
  ]
})
export class DemoModuleModule { }
