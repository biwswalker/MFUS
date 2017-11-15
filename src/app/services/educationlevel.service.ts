import { SelectItem } from 'primeng/primeng';
import { RftEducationLevel } from './../content/models/rft-education-level';
import { config } from './../app.config';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EducationLevelService {
  private mainUrl: string = config.backendUrl;
  url = this.mainUrl;

  constructor(private http: Http) { }

  getEducationLevel() {
    console.log('getEducationLevel');
    const headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.url+'educationlevel', options)
      .map(
        (res:Response)=>{
          return res.json();
        }
      );
  }


}
