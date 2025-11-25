// accessory.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessoryResponse } from '../interfaces/accessory.interface';
import { ApiService} from './api.service';
@Injectable({ providedIn: 'root' })
export class AccessoryService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getAccessories(subgroupCode: string): Observable<AccessoryResponse> {
    return this.api.post('getAccessories', {subgroupCode});
  }

  setAccessoryVisibility(subgroupCode: string, pn: string, isVisible: boolean): Observable<AccessoryResponse> {
    return this.api.post('setAccessoryVisibility', {subgroupCode, pn, isVisible});
  }

  setMultipleAccessoryVisibility(payload: any): Observable<AccessoryResponse> {
    return this.api.post('setMultipleAccessoryVisibility', {payload});
  }
}
