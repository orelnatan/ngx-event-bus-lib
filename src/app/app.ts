import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './products';
import { GlobalEventsModule } from '../global-events';

// import { Data, GlobalEventsModule, Interceptor, intercept } from '../global-events';

// @Interceptor([{ type: "LOGIN", action: "login" }])
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
   // GlobalEventsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 // productsService = inject(ProductsService);
  
  protected readonly title = signal('event-bus-lib');

  // constructor() {
  //   intercept(this);
  // } 

  // login(payload: Data): void {
  //   console.log(payload);
  // }
}
