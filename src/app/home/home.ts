import { Component } from '@angular/core';
import { GEvent, Interceptor, broadcast, intercept } from 'ngx-event-bus';
//import { Interceptor, broadcast, intercept } from '../../../projects/ngx-event-bus/src/public-api';

import { ImageNotFound } from './image-not-found';
import { GEventTypes, LocaleEvent, ThemeEvent } from '../interfaces';
import { Theme } from '../classes/g-events.class';

@Interceptor([
  { type: "MY_EVENT", action: "handleEvent", key: "BUS::MY_EVENT::A9F3-77XQ" },
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

  handleEvent(payload: {}): void {
    console.log("logout intercepted in Home Component, ", payload);
  }

  theme(payload: ThemeEvent): void {
   // console.log("theme intercepted in Home Component, ", payload);

    broadcast(new GEvent("GOT_IT", { name: Home }));
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
