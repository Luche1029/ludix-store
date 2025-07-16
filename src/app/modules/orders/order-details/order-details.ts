import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/api.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { environment } from 'src/app/core/constants';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-orders-detail',
  standalone: true,
  imports: [CommonModule, 
            CurrencyPipe, 
            DatePipe,
            RouterLink,
            FormsModule
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
  isEditable = false;

  ngOnInit(): void {
    this.loadOrderDetails();
    }

    togglePcDetails() {
      this.showPcComponents = !this.showPcComponents;
    }

    updateOrderStatus (status: number) {
      this.api.post<any>('/setOrderStatus', { orderNumber: this.orderNumber, status}).subscribe({
       next: res => {
          this.loading = false;
          this.loadOrderDetails();
        },
        error: err => {
          console.error(err);
          this.error = 'Errore durante il caricamento';
          this.loading = false;
        }
      });
    }
  loadOrderDetails() {
    this.api.post<any>('/getOrderDetails', { orderNumber: this.orderNumber }).subscribe({
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

    saveAddress(): void {
      if (!this.orderDetails?.orderNumber) {
        this.error = 'Order number missing';
        return;
      }

      const body = {
        orderNumber: this.orderDetails.orderNumber,
        ...this.orderDetails.address
      };

      this.loading = true;
      this.api.post<{ success: boolean }>('/saveOrderAddress', body)
        .subscribe({
          next: (res) => {
            this.loading = false;
            this.isEditable = false;
            if (!res.success) {
              this.error = 'Error saving address';
            }
          },
          error: (err) => {
            this.loading = false;
            this.error = 'Server error';
          }
        });
    }


    back() {
      this.router.navigate(['/orders']);
    }


}
