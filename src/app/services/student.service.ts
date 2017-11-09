import { Observable } from 'rxjs/Rx';
import { AcStudent } from './../content/models/ac-student';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { StudentForm } from '../content/form/student-form';
import 'rxjs/add/operator/map';

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
