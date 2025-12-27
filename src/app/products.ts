import { Injectable } from '@angular/core';
import { Interceptor, intercept } from 'ngx-event-bus';

import { GEventTypes, ThemeEvent } from './interfaces';

@Interceptor([
  { type: GEventTypes.Theme, action: "theme" },
])
@Injectable()
export class ProductsService {
  constructor() {
    intercept(this);
  } 

  theme(payload: ThemeEvent): void {
    console.log("theme intercepted in ProductsService Service, ", payload);
  }
}
