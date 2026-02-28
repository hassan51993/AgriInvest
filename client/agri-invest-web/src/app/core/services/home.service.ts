import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomePage } from '../models/home-page.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/home';

  getHomeData(): Observable<HomePage> {
    return this.http.get<HomePage>(this.baseUrl);
  }
}
