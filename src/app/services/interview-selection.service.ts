import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../app.config';

@Injectable()
export class InterviewSelectionService {
  private mainUrl: string = config.backendUrl;
  constructor(private http: Http) { }

  getInterviewSelectionList(){

  }
}
