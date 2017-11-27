import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../app.config';
import { AcAddress } from '../content/models/ac-address';

@Injectable()
export class AddressService {
  private mainUrl: string = config.backendUrl;
  url = this.mainUrl;
  constructor(private http: Http) { }

  getAddressByStudentRef(student_ref: string): Observable<AcAddress> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.mainUrl+'address-info/' + student_ref)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }
}
