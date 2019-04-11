import { Component } from '@angular/core';
import {  } from './app.component';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-hotel-app';
  constructor( public location: Location, private router: Router) {}
}

