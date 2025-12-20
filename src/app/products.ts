import { Injectable } from '@angular/core';

import { Interceptor, Payload, intercept } from 'ngx-event-bus';

@Interceptor([
  { type: "LOGOUT", action: "logout" },
])
@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor() {
    intercept(this);
  } 

  logout(payload: Payload): void {
    console.log("logout intercepted in ProductsService, ", payload);
  }
}
