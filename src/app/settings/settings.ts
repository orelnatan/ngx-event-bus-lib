import { Component } from '@angular/core';

import { SuffixPipe } from './suffix-pipe';

@Component({
  selector: 'app-settings',
  imports: [SuffixPipe],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {}
