import { AcStudent } from './../content/models/ac-student';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class StudentService {

  mainUrl = 'http://127.0.0.1:8000/'
  constructor(private http: Http) { }

  addStudent(form: AcStudent){
    const url = this.mainUrl + 'student';
    const body = JSON.stringify(form);
    const headers = new Headers({'content-type': 'application/json'});
    console.log(body);
    return this.http.post(url, body, {headers: headers});
  }
}