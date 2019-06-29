import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingListComponent } from './parking-list/parking-list.component';

@NgModule({
  declarations: [ParkingListComponent],
  imports: [
    CommonModule,
    ParkingRoutingModule
  ]
})
export class ParkingModule { }
