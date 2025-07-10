import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/api.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { environment } from 'src/app/core/constants';
@Component({
  selector: 'app-orders-detail',
  standalone: true,
  imports: [CommonModule, 
            CurrencyPipe, 
            DatePipe,
            RouterLink
          ],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss'
})
export class OrderDetails {
  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  public IMAGES_REMOTE_URL = environment.imagesRemoteUrl;

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  showPcComponents = false;


  orderNumber = this.route.snapshot.paramMap.get('orderNumber')!;
  orderDetails: any = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    this.api.post<any>('/getOrderDetails', { orderNumber: this.orderNumber, subgroupCode: 'SPR-WEB' }).subscribe({
       next: res => {
          this.orderDetails = res.orderDetails;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.error = 'Errore durante il caricamento';
          this.loading = false;
        }
      });
    }

    togglePcDetails() {
      this.showPcComponents = !this.showPcComponents;
    }

    back() {
      this.router.navigate(['/orders']);
    }
}
