import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamMember } from '../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/team';

  getAll(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(this.baseUrl);
  }
}
