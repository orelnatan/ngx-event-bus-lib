import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { broadcast } from 'ngx-event-bus';
//import { GEvent, broadcast } from '../../../projects/ngx-event-bus/src/public-api';

import { Locale, Logout, Theme } from '../classes/g-events.class';

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
    }));
  }
}
