import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})


export class Home {

  constructor(private auth: AuthService) {}

  orders = [
    { number: '57384710', date: '20/08/18', status: 'Shipped' },
    { number: '93874653', date: '19/08/18', status: 'Open' },
    { number: '98234967', date: '19/08/18', status: 'Open' },
    { number: '93874653', date: '20/08/18', status: 'Shipped' },
    { number: '98234967', date: '21/08/18', status: 'Open' }
  ];

  deliveries = [
    { number: '3309287', date: '16/08/18', status: 'Out for Delivery' },
    { number: '3307285', date: '18/08/18', status: 'Out for Delivery' },
    { number: '3307265', date: '19/08/18', status: 'Dispatched' },
    { number: '3307259', date: '20/08/18', status: 'Dispatched' },
    { number: '3307283', date: '21/08/18', status: 'Pending' }
  ];

  payments = [
    { number: '8276354', date: '10/08/18', amount: 236.52 },
    { number: '0399376', date: '12/08/18', amount: 322.00 },
    { number: '9207436', date: '19/08/18', amount: 534.12 },
    { number: '3452757', date: '20/08/18', amount: 106.22 },
    { number: '8376352', date: '21/08/18', amount: 218.11 }
  ];

  ngOnInit() {
    const user = this.auth.getUser();
    const role = this.auth.getRole();
  }

}
