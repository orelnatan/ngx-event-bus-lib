import { Component, inject } from '@angular/core';
import { Interceptor, intercept } from 'ngx-event-bus';

import { ProductsService } from '../products';
import { GEventTypes, ThemeEvent } from '../interfaces';

@Interceptor([
  { type: GEventTypes.Theme, action: "theme" },
])
@Component({
  selector: 'app-board',
  imports: [],
  providers: [ProductsService],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  productsService = inject(ProductsService);

  constructor() {
    intercept(this);
  } 

  theme(payload: ThemeEvent): void {
    console.log("theme intercepted in Board Component, ", payload);
  }
}
