import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-groups-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './groups-list.html',
  styleUrl: './groups-list.scss',
  template: `
    <section class="groups">
      <h2>Gruppi</h2>
      <ul>
        <li *ngFor="let group of groups">
          {{ group.name }} ({{ group.code }})
        </li>
      </ul>
    </section>
  `
})
export class GroupsList {
  groups = [
    { code: 'GR001', name: 'Gruppo A' },
    { code: 'GR002', name: 'Gruppo B' }
  ];
}
