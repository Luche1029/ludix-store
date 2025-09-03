import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { ColumnConfig } from 'src/app/shared/table/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-categories-list',
  imports: [
    CommonModule, 
    RouterModule,  
    DragDropModule
  ],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss'
})
export class CategoriesList {

  categories: any[] = [];
  loading = false;
  error = '';  

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();    
  }

  loadCategories() {
    this.loading = true;
    this.api.post<any>('/getCategories', null).subscribe({
        next: (res) => {
        this.categories = res.categories || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading brands';
        this.loading = false;
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    console.log(event.previousIndex, event.currentIndex)
    this.categories.forEach((element, index) => {
      element.view_order = index + 1;
      
    });
    this.updateOrderInDB();
  }

  updateOrderInDB() {
    const payload = this.categories.map((cat, index) => ({
      code: cat.code,
      view_order: index + 1
    }));

    console.log(JSON.stringify(payload));

    this.api.post<any>('/updateCategoriesOrder', { categories: payload }).subscribe({
      next: res => console.log('Order updated'),
      error: err => console.error('Error updating order', err)
    });
  }

  resetOrder() {
    this.api.post<any>('/resetCategoriesOrder', null).subscribe({
      next: res => { console.log('Order updated'); this.loadCategories(); },
      error: err => console.error('Error updating order', err)
    });    
  }

  seeDeatais() {
    alert('Method not implemented.');
  }
}
