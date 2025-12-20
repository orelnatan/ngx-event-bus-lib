import { Component } from '@angular/core';

import { GEvent, broadcast } from 'ngx-event-bus';

import { ImageNotFound } from './image-not-found';

@Component({
  selector: 'app-home',
  imports: [ImageNotFound],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  broadcast(): void {
    broadcast(new GEvent('LOGOUT', {
      rememberMe: true
    }))
  }
}
