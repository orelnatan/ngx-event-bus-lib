import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { GEvent, Interceptor, broadcast, intercept } from 'ngx-event-bus';
//import { GEvent, broadcast } from '../../../projects/ngx-event-bus/src/public-api';

import { Locale, Logout, Theme } from '../classes/g-events.class';
import { GEventTypes, LocaleEvent, ThemeEvent } from '../interfaces';

export const TRUSTED_EVENT: symbol = Symbol('__trustedEvent');

@Interceptor([
  { type: "GOT_IT", action: "gotIt" },
])
@Component({
  selector: 'app-core-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './core-root.html',
  styleUrl: './core-root.scss',
})
export class CoreRoot {
  constructor() {
    intercept(this);
  }

  broadcastLogout(): void {
    broadcast(new Logout());
  }

  broadcastTheme(): void {
    broadcast(new Theme({
      mode: "LIGHT",
      brightness: 32
    }));
  }

  broadcastLocale(): void {
    broadcast(new Locale({
      lang: "en_US",
      dir: "lr"
    }));
  }

  gotIt(data: { name: string }): void {
    console.log(data);
  }
}