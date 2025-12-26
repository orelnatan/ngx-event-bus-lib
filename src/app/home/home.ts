import { Component } from '@angular/core';

 import { GEvent, Interceptor, broadcast, intercept } from 'ngx-event-bus';

import { ImageNotFound } from './image-not-found';
import { LogoutGEvent, ToggleGEvent } from '../interfaces';

@Interceptor([
  { type: "LOGOUT", action: "logout" },
  { type: "TOGGLE", action: "toggle" },
])
@Component({
  selector: 'app-home',
  imports: [ImageNotFound],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor() {
    intercept(this);
  } 

  logout(payload: LogoutGEvent): void {
    console.log("logout intercepted in Home Component, ", payload);
  }

  toggle(payload: ToggleGEvent): void {
    console.log("toggle intercepted in Home Component, ", payload);
  }
}
