import { ScholarshipForm } from './../content/form/scholarship-form';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ScholarshipService {

  constructor(private http: Http) { }


  addScholarship(scholarship: ScholarshipForm) {
    const url = 'http://restfulapi.dev/scholarship';
    const body = JSON.stringify(scholarship);
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, body, {headers: headers});
  }

}
