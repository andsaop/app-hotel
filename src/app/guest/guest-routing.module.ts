import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestComponent } from './guest.component';
import { GuestFormComponent } from './guest-form/guest-form.component';


const guestRoutes: Routes = [

  { path: 'guest',     component: GuestComponent },
  { path: 'guest/new',     component: GuestFormComponent },
  { path: 'guest/edit/:id',     component: GuestFormComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(guestRoutes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
