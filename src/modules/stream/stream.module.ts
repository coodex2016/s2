import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamRoutingModule } from './stream-routing.module';
import { StreamParkingComponent } from './stream-parking/stream-parking.component';
import { StreamFinanceComponent } from './stream-finance/stream-finance.component';

@NgModule({
  declarations: [StreamParkingComponent, StreamFinanceComponent],
  imports: [
    CommonModule,
    StreamRoutingModule
  ]
})
export class StreamModule { }
