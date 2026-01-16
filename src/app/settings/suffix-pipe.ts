import { Pipe, PipeTransform } from '@angular/core';
import { Interceptor, broadcast, intercept } from 'ngx-event-bus-lib';

import { GEventTypes, ThemeEvent } from '../interfaces';
import { Theme } from '../classes/g-events.class';

@Interceptor([
  { type: GEventTypes.Theme, action: "theme" },
])
@Pipe({
  name: 'suffix',
  pure: false
})
export class SuffixPipe implements PipeTransform {
  constructor() {
    intercept(this);
  } 

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

  theme(payload: ThemeEvent): void {
    console.log("theme intercepted in SuffixPipe, ", payload);
  }

  broadcastTheme(): void {
    broadcast(new Theme({
      mode: "DARK",
      brightness: 22,
    }));
  }
}
