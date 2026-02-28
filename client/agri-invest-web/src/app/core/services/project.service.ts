import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedList } from '../models/paginated-list.model';
import { Project, ProjectSummary, ProjectType } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/projects';

  getAll(page?: number, pageSize?: number, type?: ProjectType): Observable<PaginatedList<ProjectSummary>> {
    let params = new HttpParams();

    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (type !== undefined) {
      params = params.set('type', type.toString());
    }

    return this.http.get<PaginatedList<ProjectSummary>>(this.baseUrl, { params });
  }

  getBySlug(slug: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${slug}`);
  }

  getFeatured(): Observable<ProjectSummary[]> {
    return this.http.get<ProjectSummary[]>(`${this.baseUrl}/featured`);
  }
}
