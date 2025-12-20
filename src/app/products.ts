import { Injectable } from '@angular/core';

import { Data, Interceptor, intercept } from '../global-events';

@Interceptor([
  { type: "LOGOUT", action: "logout" },
])
@Injectable()
export class ProductsService {
  constructor() {
    intercept(this);
  } 

  logout(payload: Data): void {
    console.log("logout intercepted in ProductsService, ", payload);
  }
}
