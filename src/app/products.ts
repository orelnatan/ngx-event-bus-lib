import { Injectable } from '@angular/core';

import { Interceptor, intercept } from 'ngx-event-bus';

@Interceptor([
 // { type: "LOGOUT", action: "logout" },
])
@Injectable()
export class ProductsService {
  constructor() {
    intercept(this);
  } 

  // logout(payload: Payload): void {
  //   console.log("logout intercepted in ProductsService, ", payload);
  // }
}
