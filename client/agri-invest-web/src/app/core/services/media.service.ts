import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaItem, MediaType } from '../models/media-item.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/media';

  getAll(): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(this.baseUrl);
  }

  getByType(type: MediaType): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(`${this.baseUrl}?type=${type}`);
  }
}
