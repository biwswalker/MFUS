import { AcSibling } from './../content/models/ac-sibling';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../app.config';


@Injectable()
export class SiblingService {
  private mainUrl: string = config.backendUrl;
  url = this.mainUrl;
  constructor(private http: Http) { }

  getSiblingByStudentRef(student_ref: string): Observable<AcSibling[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.mainUrl+'sibling-info/' + student_ref)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }
}
