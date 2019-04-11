import { Injectable, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private readonly API_URL = 'https://rest.hospedes.api/123/'


  constructor(private http: HttpClient) { }

  eventDeletGuest = new EventEmitter<any>();

  listGuestsStorage: any[] = JSON.parse(localStorage.getItem('guests')) || []

  saveNewGuests(guests) {
    this.listGuestsStorage.push(guests);
    this.saveChanges();
  }
  removeGuest(id) {
    this.listGuestsStorage.forEach((element => {
      if (element.id == id)
        this.listGuestsStorage.splice(this.listGuestsStorage.indexOf(element), 1);
    }))
    this.saveChanges();
    this.eventDeletGuest.emit(this.listGuestsStorage);
  }

  editGuest(guest) {
    if(this.listGuestsStorage.find(element => element.id == guest.id)){
      this.removeGuest(guest.id)
      this.saveNewGuests(guest)
    }
  }

  saveChanges() {
    localStorage.setItem('guests', JSON.stringify(this.listGuestsStorage));
  }

  getAllGuests() {
    return JSON.parse(localStorage.getItem('guests'));
  }

  getGuest(id): any {
    return this.listGuestsStorage.find(elem => elem.id == id)
  }

  setId() {
    if (this.listGuestsStorage.length != 0) {
      return this.listGuestsStorage.slice(-1)[0].id;
    }
    return 0;
  }

  exportGuests(){
    return this.http.post(this.API_URL, this.listGuestsStorage).pipe(take(1)) 
  }

  consultaCep(cep){
    return this.http.get(`//viacep.com.br/ws/${cep}/json`)
  }
  
}
