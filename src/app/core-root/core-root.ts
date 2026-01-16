import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { GEvent, broadcast } from 'ngx-event-bus-lib';

import { GEventTypes } from '../interfaces';

enum MyEventTypes {
  MyEvent = "MY_EVENT"
}

interface MyEventPayload {
  metadata: string;
}

export class MyEvent extends GEvent<MyEventTypes.MyEvent, MyEventPayload> {
  static readonly TYPE = MyEventTypes.MyEvent;

  constructor(payload: MyEventPayload) {
    super(MyEvent.TYPE, payload);
  }
}

@Component({
  selector: 'app-core-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './core-root.html',
  styleUrl: './core-root.scss',
})
export class CoreRoot {
  publish(): void {
    broadcast(
      new GEvent("MY_EVENT", {
        metadata: "My event data..."
      }, "BUS::MY_EVENT::A9F3-77XQ") 
    );
  }
}