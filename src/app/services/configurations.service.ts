import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { config } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigurationsService {

  private url = config.backendUrl;

  constructor(private http: HttpClient) { }

  serviceMethodGet(path: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + path, { headers: headers });
  }

  serviceMethodPost(path: string, bodyParam: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(bodyParam);
    return this.http.post(this.url + path, body, { headers: headers })
  }

}
