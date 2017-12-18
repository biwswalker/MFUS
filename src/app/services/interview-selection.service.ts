import { InterviewSelectionForm } from './../content/form/interview-selection-form';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../app.config';

@Injectable()
export class InterviewSelectionService {
  private mainUrl: string = config.backendUrl;
  url = this.mainUrl;
  constructor(private http: Http) { }

  getInterviewSelectionList(form:InterviewSelectionForm){
      const body = JSON.stringify(form);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      console.log(body);
      this.http.post(this.url+'interview-selection-list', body, { headers: headers }).subscribe(
        (res: Response) => {
        console.log(res.json);
        }
      );
    }
}
