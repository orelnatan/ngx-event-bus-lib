import { Pipe, PipeTransform } from '@angular/core';
//import { Data, Interceptor, intercept } from '../../global-events';

// @Interceptor([{ type: "LOGIN", action: "login" }])
@Pipe({
  name: 'suffix',
})
export class SuffixPipe implements PipeTransform {
  constructor() {
   // intercept(this);
  } 

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

  // login(payload: Data): void {
  //   console.log("intercepted in SuffixPipe, ", payload);
  // }
}
