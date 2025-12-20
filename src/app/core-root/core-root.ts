import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { GEvent, GlobalEventsModule, broadcast } from '../../global-events';

@Component({
  selector: 'app-core-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive, GlobalEventsModule],
  templateUrl: './core-root.html',
  styleUrl: './core-root.scss',
})
export class CoreRoot {
  // productsService = inject(ProductsService);


  broadcast(): void {
    // broadcast(new GEvent('LOGIN', {
    //   rememberMe: true
    // }))

    // broadcast(new GEvent('TOGGLE', {
    //   mode: "full-screen"
    // }))

    broadcast(new GEvent('LOGOUT', {
      dispose: true
    }))
  }
}
