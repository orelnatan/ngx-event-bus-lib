import { Component, inject } from '@angular/core';
import { ProductsService } from '../products';

@Component({
  selector: 'app-board',
  imports: [],
  // providers: [ProductsService],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  productsService = inject(ProductsService);

}
