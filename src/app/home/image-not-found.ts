import { Directive } from '@angular/core';

import { Interceptor, intercept } from 'ngx-event-bus';
//import { Interceptor, intercept} from '../../../projects/ngx-event-bus/src/public-api';

import { GEventTypes, ThemeEvent } from '../interfaces';

@Interceptor([
  { type: GEventTypes.Theme, action: "theme" },
])
@Directive({
  selector: '[appImageNotFound]',
})
export class ImageNotFound {
  constructor() {
    intercept(this);
  }

  theme(payload: ThemeEvent): void {
    console.log("theme intercepted in ImageNotFound Directive, ", payload);
  }
}
