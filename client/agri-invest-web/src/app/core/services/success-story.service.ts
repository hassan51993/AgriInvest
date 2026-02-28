import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessStory, SuccessStorySummary } from '../models/success-story.model';

@Injectable({
  providedIn: 'root'
})
export class SuccessStoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/success-stories';

  getAll(): Observable<SuccessStorySummary[]> {
    return this.http.get<SuccessStorySummary[]>(this.baseUrl);
  }

  getBySlug(slug: string): Observable<SuccessStory> {
    return this.http.get<SuccessStory>(`${this.baseUrl}/${slug}`);
  }

  getFeatured(): Observable<SuccessStorySummary[]> {
    return this.http.get<SuccessStorySummary[]>(`${this.baseUrl}/featured`);
  }
}
