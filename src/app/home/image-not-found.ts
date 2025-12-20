import { Directive } from '@angular/core';
// import { Data, Interceptor, intercept } from '../../global-events';

// @Interceptor([
//   { type: "TOGGLE", action: "toggle" }
// ])
@Directive({
  selector: '[appImageNotFound]',
})
export class ImageNotFound {

  constructor() {
   // intercept(this);
  }

  // toggle(payload: Data): void {
  //   console.log("toggle intercepted in ImageNotFound, ", payload);
  // }
}
