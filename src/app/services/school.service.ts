import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { RftSchool } from './../content/models/rft-school';
import { SchoolForm } from './../content/form/school-form';
import { Injectable } from '@angular/core';

@Injectable()
export class SchoolService {

  constructor(private http: Http) { }

  getSchools(): Observable<RftSchool[]> {
    const url = 'http://restfulapi.dev/school';
    const headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
    .map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  addSchool(school: SchoolForm) {
    console.log(school);
    console.log(JSON.stringify(school));
    const url = 'http://restfulapi.dev/school';
    const body = JSON.stringify(school);
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, body, {headers: headers});
  }

  searchSchool(school: SchoolForm): Observable<RftSchool[]> {
    const url = 'http://restfulapi.dev/school';
    const headers = new Headers({'Content-Type': 'application/json'});
    let myParams = new URLSearchParams();
    myParams.append('school_ref', school.rftSchool.school_ref);
    myParams.append('school_name_t', school.rftSchool.school_name_t);
    let options = new RequestOptions({headers: headers, params: myParams});
    return this.http.get(url, options)
    .map(
      (res: Response) => {
        return res.json();
      }
    );
  }

}
