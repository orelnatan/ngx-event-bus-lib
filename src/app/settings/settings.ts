import { Component } from '@angular/core';
import { Interceptor, broadcast, intercept } from 'ngx-event-bus';
///import { Interceptor, broadcast, intercept } from '../../../projects/ngx-event-bus/src/public-api';

import { SuffixPipe } from './suffix-pipe';
import { GEventTypes } from '../interfaces';
import { Locale } from '../classes/g-events.class';

@Interceptor([
  { type: GEventTypes.Locale, action: "locale" },
])
@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  constructor() {
    intercept(this);
  } 

  locale(payload: Locale): void {
    console.log("locale intercepted in Settings Component, ", payload);
  }
}
