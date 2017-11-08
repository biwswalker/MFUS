import { RftDistrict } from './../content/models/rft-district';
import { RftProvince } from './../content/models/rft-province';
import { Observable } from 'rxjs';
import { config } from './../app.config';
import { Injectable } from "@angular/core";
import { RequestOptions, Headers, Http, Response } from '@angular/http';

const url: string = config.backendUrl;

@Injectable()
export class StartupService {

  public provinceList: RftProvince[] = [];

  constructor(private http: Http) {}

  loadProvinces(): Promise<RftProvince[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url+'province', options)
      .map(
      (res: Response) => {
     //   console.log(res.json());
        return res.json();
      }
      ).toPromise()
      .then((data: any) => this.provinceList = data)
      .catch((err: any) => Promise.resolve());
  }


}
