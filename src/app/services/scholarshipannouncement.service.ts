
import { SmScholarshipAnnouncement } from './../content/models/sm-scholarship-announcement';
import { SmScholarship } from './../content/models/sm-scholarship';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx'
import { config } from './../app.config';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class ScholarshipannouncementService {

  private mainUrl: string = config.backendUrl;

  constructor(private http: Http) { }

  getScholarshipList(): Observable<SmScholarship[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.mainUrl + 'scholarship-announcement', options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  getScholarshipAnnouncementList(): Observable<SmScholarshipAnnouncement[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.mainUrl + 'scholarship-announcement', options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  searchScholarshipAnnouncementFromYear(year: string): Observable<any[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.mainUrl + 'atpscholar-announce/year=' + year + "|year", options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );

  }


}
