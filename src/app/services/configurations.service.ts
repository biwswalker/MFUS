import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../app.config';

@Injectable()
export class ConfigurationsService {

  constructor(private http:Http) { }

  serviceConfiguration(path: string, type: string, body): Observable<any>{
    const headers = new Headers({'Content-Type': 'application/json'});
    switch(type){
      case 'POST':{
        const jsonBody = JSON.stringify(body)
        return this.http.post(config.backendUrl + path, jsonBody, {headers: headers});
      }
      case 'GET':{
        return this.http.get(config.backendUrl + path, {headers: headers});
      }
      default:{
        return Observable.throw('Error type GET or POST');
      }
    }
  }
}
