import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public postData(path: string, data?: any) {
    return this.httpClient.post<any>(API_URL + path, JSON.stringify(data));
  }
}
