import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:5000/api'; // replace with the actual backend API URL

  constructor(private http: HttpClient) { }

  getBodyStyles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/bodystyles`);
  }

  getCarsByBodyStyle(bodyStyle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cars/bodystyle/${bodyStyle}`);
  }
}
