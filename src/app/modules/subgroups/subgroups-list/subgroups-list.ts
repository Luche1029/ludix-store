import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-subgroups-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './subgroups-list.html',
  styleUrl: './subgroups-list.scss',
  template: `
    <section class="subgroups">
      <h2>Sottogruppi</h2>
      <ul>
        <li *ngFor="let subgroup of subgroups">
          {{ subgroup.name }} ({{ subgroup.code }})
        </li>
      </ul>
    </section>
  `
})
export class SubgroupsList {
  subgroups = [
    { code: 'SG001', name: 'Sub A' },
    { code: 'SG002', name: 'Sub B' }
  ];
}
