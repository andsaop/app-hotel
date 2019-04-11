import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestComponent } from './guest.component';
import { GuestFormComponent } from './guest-form/guest-form.component';
import { GuestRoutingModule } from './guest-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    GuestComponent,
    GuestFormComponent,
    
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GuestRoutingModule,
    HttpClientModule
    
  ],
  providers:[CommonModule],
})
export class GuestModule { }
