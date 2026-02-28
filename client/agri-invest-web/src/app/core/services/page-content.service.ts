import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageContent } from '../models/page-content.model';

@Injectable({
  providedIn: 'root'
})
export class PageContentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/pages';

  getByPageKey(pageKey: string): Observable<PageContent[]> {
    return this.http.get<PageContent[]>(`${this.baseUrl}/${pageKey}`);
  }
}
