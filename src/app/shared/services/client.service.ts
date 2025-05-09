import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'https://localhost:7095/api/Cliente';

  constructor(private http: HttpClient) {}

  getClientes(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
    );
  }
}
