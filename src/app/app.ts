import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Interceptor, broadcast, intercept } from 'ngx-event-bus';

import { GEventTypes, ThemeEvent } from './interfaces';

@Interceptor([
  { type: GEventTypes.Theme, action: "theme" },
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
  
  theme(payload: ThemeEvent): void {
    console.log("theme intercepted in App Component, ", payload);
  }
}
