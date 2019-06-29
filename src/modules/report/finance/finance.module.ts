import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceListComponent } from './finance-list/finance-list.component';

@NgModule({
  declarations: [FinanceListComponent],
  imports: [
    CommonModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
