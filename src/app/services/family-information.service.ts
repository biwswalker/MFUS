import { Observable } from 'rxjs/Rx';
import { AcParent } from '../content/models/ac-parent';
import { config } from './../app.config';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class FamilyInformationService {

  mainUrl: string = config.backendUrl;

  constructor(private http: Http) { }

  getFamilyInformationFromRef(ref: string): Observable<AcParent> {

    const url = this.mainUrl + 'family-information/' + ref;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url , options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }
}
