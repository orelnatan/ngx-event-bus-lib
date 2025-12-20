import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Interceptor, Payload, intercept } from 'ngx-event-bus';

@Interceptor([
  { type: "LOGOUT", action: "logout" },
])
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {  
  constructor() {
    intercept(this);
  } 

  logout(payload: Payload): void {
    console.log("logout intercepted in App Component, ", payload);
  }
}
