import { Observable } from 'rxjs/Rx';

import { config } from './../app.config';
import { ApplyScholarshipForm } from './../content/form/apply-scholarshop-form';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplyscholarshipService {

  private activeIndex = 0;
  private applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm();



  private mainUrl: string = config.backendUrl;

  constructor(private http: Http) { }

  nextIndex(){
    this.activeIndex += 1;
    console.log(this.activeIndex);
  }

  getIndex(){
    return this.activeIndex;
  }

  getData(){
    return this.applyScholarshipForm;
  }

  getStudentInfo(studentRef: string): Observable<ApplyScholarshipForm> {
    const url = this.mainUrl + 'student/student_ref=' + studentRef;
    const headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    console.log('url = ' + url);

    return this.http.get(url, options)
    .map(
      (res: Response) => {
         let result: ApplyScholarshipForm = new ApplyScholarshipForm();
        for (let data of res.json()) {
          result.acStudent = data.ac_student;
          result.rftMajor = data.rft_major;
          result.rftSchool = data.rft_school;
          result.rftTitleName = data.rft_title_name;
        }


        return result;
      }
    );
  }

}
