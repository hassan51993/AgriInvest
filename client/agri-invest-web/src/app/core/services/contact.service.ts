import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactInquiry, ApiResult } from '../models/contact-inquiry.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/contact';

  submit(inquiry: ContactInquiry): Observable<ApiResult<number>> {
    return this.http.post<ApiResult<number>>(this.baseUrl, inquiry);
  }
}
