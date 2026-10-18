import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDto, ContactMessageDto } from '../models/project.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = `${environment.apiUrl}/projects`;
  private contactUrl = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.apiUrl);
  }

  getProjectById(id: string): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${this.apiUrl}/${id}`);
  }

  createProject(project: any): Observable<ProjectDto> {
    return this.http.post<ProjectDto>(this.apiUrl, project);
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  sendMessage(message: ContactMessageDto): Observable<any> {
    return this.http.post<any>(this.contactUrl, message);
  }
}
