import { Component } from '@angular/core';

import { Data, Interceptor, intercept } from '../../global-events';
import { SuffixPipe } from './suffix-pipe';

@Interceptor([
 // { type: "LOGIN", action: "login" }
])
@Component({
  selector: 'app-settings',
  imports: [SuffixPipe],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  constructor() {
    intercept(this);
  } 

  login(payload: Data): void {
    console.log("intercepted in Settings, ", payload);
  }
}
