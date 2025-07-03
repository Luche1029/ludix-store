import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../core/loader.service';

@Component({
  standalone: true,
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class Loader {
  constructor(public loader: LoaderService) {
    this.loader.loading$.subscribe(value => console.log('loader$', value));
  }
}

