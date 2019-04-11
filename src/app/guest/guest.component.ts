import { Component, OnInit } from '@angular/core';
import { GuestService } from './guest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  guests : any[];

  constructor(
    private guestService: GuestService,
    private router: Router,
    ) { }

  ngOnInit() {
      this.guests = this.guestService.getAllGuests();
      this.guestService.eventDeletGuest.subscribe(
        listGuest => this.guests = listGuest
      );
  }

  newGuest(id){
    this.router.navigate(['/guest/new']);
  }

  removeGuest(id){
    this.guestService.removeGuest(id);
  }

  editGuest(id){
    this.router.navigate(['/guest/edit', id]);
  }

  exportGuests(){
    this.guestService.exportGuests().subscribe(
      success => console.log('Exportação feita com sucesso'),
      error => console.error(error)
    );
  }

}
