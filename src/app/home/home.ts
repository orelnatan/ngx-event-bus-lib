import { Component } from '@angular/core';
import { Interceptor, broadcast, intercept } from 'ngx-event-bus';
//import { GEvent, Interceptor, broadcast, intercept } from '../../../projects/ngx-event-bus/src/public-api';

import { ImageNotFound } from './image-not-found';
import { GEventTypes, LocaleEvent, ThemeEvent } from '../interfaces';
import { Theme } from '../classes/g-events.class';

@Interceptor([
  { type: GEventTypes.Logout, action: "logout" },
  { type: GEventTypes.Theme, action: "theme" },
  { type: GEventTypes.Locale, action: "locale" },
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

  logout(payload: null): void {
    console.log("logout intercepted in Home Component, ", payload);
  }

  theme(payload: ThemeEvent): void {
    console.log("theme intercepted in Home Component, ", payload);
  }

  locale(payload: LocaleEvent): void {
    console.log("locale intercepted in Home Component, ", payload);
  }

  broadcastTheme(): void {
    broadcast(new Theme({
      mode: "DARK",
      brightness: 45,
    }));
  }
}
