import { Component } from '@angular/core';

import { Data, Interceptor, intercept } from '../../global-events';
import { ImageNotFound } from './image-not-found';

@Interceptor([
  // { type: "LOGIN", action: "login" },
  // { type: "TOGGLE", action: "toggle" }
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

  login(payload: Data): void {
    console.log("login intercepted in Home, ", payload);
  }

  toggle(payload: Data): void {
    console.log("toggle intercepted in Home, ", payload);
  }
}
