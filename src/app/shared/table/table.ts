import { Component, Input, Signal, signal, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    TranslateModule
  ],
  templateUrl: './table.html',
  styleUrls: ['./table.scss']
})
export class TableModule {

  private _data = signal<any[]>([]);
  @Input() set data(value: any[]) {
    this._data.set(value || []);
  }
  get data() {
    return this._data();
  }

  @Input() columns: ColumnConfig[] = [];
  @Output() buttonClick = new EventEmitter<{ action: string, params: any }>();

  searchTerm = signal('');
  sortColumn = signal('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  readonly filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase();
    let filtered = this.data.filter(row =>
      this.columns.some(col =>
        (row[col.key] || '').toString().toLowerCase().includes(term)
      )
    );

    const col = this.sortColumn();
    if (col) {
      filtered = [...filtered].sort((a, b) => {
        const valA = a[col]?.toString().toLowerCase() || '';
        const valB = b[col]?.toString().toLowerCase() || '';
        return this.sortDirection() === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }

    return filtered;
  });

  sortBy(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  page = signal(1);
  pageSize = signal(10);

  readonly pagedData = computed(() => {
    const data = this.filteredData();
    const start = (this.page() - 1) * this.pageSize();
    return data.slice(start, start + this.pageSize());
  });

  get totalPages() {
    return Math.ceil(this.filteredData().length / this.pageSize());
  }

  setPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
        this.page.set(newPage);
    }
  }

  onButtonClick(action: string | undefined, row: any, col: ColumnConfig) {
    if (!action) return;

    const params: any = {};
    if (col.params) {
      col.params.forEach(key => {
        params[key] = row[key];
      });
    }

    this.buttonClick.emit({ action, params });
  }

}

export interface ColumnConfig {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'currency' | 'link' | 'button';
  format?: string;
  currency?: string;
  path?: string;
  action?: string;
  params?: string[];
}
