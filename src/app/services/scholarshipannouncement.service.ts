import { SmScholarshipAnnouncement } from './../content/models/sm-scholarship-announcement';
import { SmScholarship } from './../content/models/sm-scholarship';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx'
import { Http, Headers, Response, RequestOptions } from '@angular/http';

const url = 'http://127.0.0.1:8000/scholarship-announcement';

@Injectable()
export class ScholarshipannouncementService {

  constructor(private http: Http) { }

  getScholarshipList(): Observable<SmScholarship[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  getScholarshipAnnouncementList(): Observable<SmScholarshipAnnouncement[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }



}
