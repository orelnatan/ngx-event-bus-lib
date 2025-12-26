import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { GEvent, broadcast } from 'ngx-event-bus';
// import { GEvent, broadcast } from '../../../projects/ngx-event-bus/src/public-api';

import { LogoutGEvent, ToggleGEvent } from '../interfaces';

@Component({
  selector: 'app-core-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './core-root.html',
  styleUrl: './core-root.scss',
})
export class CoreRoot {
  broadcastLogout(): void {
    broadcast(new GEvent<LogoutGEvent>('LOGOUT', {
      rememberMe: false
    }))
  }

  broadcastToggle(): void {
    broadcast(new GEvent<ToggleGEvent>('TOGGLE', {
      mode: "DARK",
      brightness: 45
    }))
  }
}
