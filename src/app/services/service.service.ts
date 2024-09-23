import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:8000/api/services'; 

  constructor(private http: HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addService(name: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photo);

    return this.http.post(this.apiUrl, formData);
  }


}
