import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { GEvent, broadcast } from 'ngx-event-bus';
// import { GEvent, broadcast } from '../../../projects/ngx-event-bus/src/public-api';

@Component({
  selector: 'app-core-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './core-root.html',
  styleUrl: './core-root.scss',
})
export class CoreRoot {
  // productsService = inject(ProductsService);

  broadcast(): void {
    broadcast(new GEvent('LOGOUT', {
      dispose: true
    }))

    broadcast(new GEvent('TOGGLE', {
      mode: "DARK"
    }))
  }
}
