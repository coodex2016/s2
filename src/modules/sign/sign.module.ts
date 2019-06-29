import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignRoutingModule } from './sign-routing.module';
import { LoginComponent } from '@module/sign/login/login.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
      SharedModule,
    SignRoutingModule
  ]
})
export class SignModule { }
