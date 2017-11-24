import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../app.config';
import { AcParent } from '../content/models/ac-parent';

@Injectable()
export class ParentService {
  private mainUrl: string = config.backendUrl;
  constructor(private http: Http) { }

  getParentByStudentRef(student_ref: string): Observable<AcParent> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.mainUrl+'parent-info/' + student_ref,{headers:headers})
      .map((res: Response) => {
          return res.json();
        }
      );
  }
}
