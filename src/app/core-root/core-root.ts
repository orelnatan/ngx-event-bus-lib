import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { broadcast } from 'ngx-event-bus';
//import { GEvent, broadcast } from '../../../projects/ngx-event-bus/src/public-api';

import { Locale, Logout, Theme } from '../classes/g-events.class';
import { GEventTypes } from '../interfaces';

export const TRUSTED_EVENT: symbol = Symbol('__trustedEvent');

@Component({
  selector: 'app-core-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './core-root.html',
  styleUrl: './core-root.scss',
})
export class CoreRoot {
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
      lang: "he_IL",
      dir: "rl"
    }))
  }
}


// const prototype = Object.create(Object.freeze({
//   [TRUSTED_EVENT]: true,
// }));

// Object.assign(prototype, {
//   lang: "he_IL",
//   dir: "rl"
// });

// window.dispatchEvent(
//   new CustomEvent(GEventTypes.Locale, {
//     detail: prototype,
//   })
// );