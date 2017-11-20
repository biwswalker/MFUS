import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../app.config';
import { FamilyAndAddressForm } from '../content/form/family-and-address-form';

@Injectable()
export class FamilyAndAddressService {
  private mainUrl: string = config.backendUrl;
  url = this.mainUrl+'family-and-address';
  constructor(private http: Http) { }

  insertFamilyAndAddress(form: FamilyAndAddressForm){
    const body = JSON.stringify(form);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(body);
    this.http.post(this.url, body, { headers: headers }).subscribe(
      (res: Response) => {
       console.log(res.json);
      }
    );
  }
}
