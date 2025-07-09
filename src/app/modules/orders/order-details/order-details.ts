import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-orders-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss'
})
export class OrderDetails {
  constructor(private router: Router) {}
  back() {
     this.router.navigate(['/orders']);
  }

}
