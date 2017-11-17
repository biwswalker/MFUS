import { ApScholarshipHistory } from './../content/models/ap-scholarship-history';
import { Observable } from 'rxjs/Rx';

import { config } from './../app.config';
import { ApplyScholarshipForm } from './../content/form/apply-scholarshop-form';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { ApApplication } from '../content/models/ap-application';
import { ApStudentLoanFund } from '../content/models/ap-student-loan-fund';

@Injectable()
export class ApplyscholarshipService {

  private activeIndex = 0;
  private applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm();



  private mainUrl: string = config.backendUrl;

  constructor(private http: Http) { }

  nextIndex(index){
    this.activeIndex = index;
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

  addFamilyFinancial(form: ApplyScholarshipForm) {
    const url = this.mainUrl + 'familyFinancial';
    const headers = new Headers({'Content-Type': 'application.json'});
    const body = JSON.stringify(form.apFamilyFinancial);
    return this.http.post(url, body, {headers: headers})
  }

  getScholarshipHistory(): Observable<ApScholarshipHistory[]> {
    console.log('service.getScholarshipHistory')
    const url = this.mainUrl + 'scholarship-history';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map(
      (res: Response) => {
        console.log(res.json())
        return res.json();
      }
      );
  }

  getStdLoan(): Observable<ApStudentLoanFund[]> {
    console.log('service.getStdLoan')
    const url = this.mainUrl + 'student-loan-fund';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map(
      (res: Response) => {
        console.log(res.json())
        return res.json();
      }
      );
  }

  addApplication(form: ApApplication) {
    const url = this.mainUrl + 'application';
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(form);;

    console.log('json: ', body)
    return this.http.post(url, body, { headers: headers });
  }
}
