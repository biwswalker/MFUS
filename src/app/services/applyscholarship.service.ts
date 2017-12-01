import { Observer } from 'rxjs/Observer';
import { AcStudent } from '../content/models/ac-student';
import { ScholarshipannouncementService } from './scholarshipannouncement.service';
import { ApScholarshipHistory } from "./../content/models/ap-scholarship-history";
import { Observable } from "rxjs/Rx";
import { config } from "./../app.config";
import { ApplyScholarshipForm } from "./../content/form/apply-scholarshop-form";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { ApApplication } from "../content/models/ap-application";
import { ApStudentLoanFund } from '../content/models/ap-student-loan-fund';
import { ApFamilyDebt } from '../content/models/ap-family-debt';
import { ApFamilyFinancial } from '../content/models/ap-family-financial';
import { ApDocumentUpload } from '../content/models/ap-document-upload';
import { ApplyScholarshipComponent } from '../content/pages/apply-scholarship/apply-scholarship.component';

@Injectable()
export class ApplyscholarshipService {

  private activeIndex = 0;

  private applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm();
  private form: ApplyScholarshipForm = new ApplyScholarshipForm();

  public scholarshipHistoryList: ApScholarshipHistory[] = [];
  public studentLoanFundList: ApStudentLoanFund[] = [];
  public debtList: ApFamilyDebt[] = [];
  private fileList: ApDocumentUpload[] = []
  private familyFinancial: ApFamilyFinancial = new ApFamilyFinancial();
  private mainUrl: string = config.backendUrl;

  constructor(private http: Http) { }

  nextIndex(index) {
    this.activeIndex = index;
    console.log(this.activeIndex);
  }

  getIndex() {
    return this.activeIndex;
  }

  getData() {
    return this.applyScholarshipForm;
  }

  getForm() {
    return this.form;
  }

  getStudentInfo(studentRef: string): Observable<ApplyScholarshipForm> {
    const url = this.mainUrl + "student/student_ref=" + studentRef;
    const headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    console.log("url = " + url);

    return this.http.get(url, options).map((res: Response) => {
      console.log(res)
      let result: ApplyScholarshipForm = new ApplyScholarshipForm();
      for (let data of res.json()) {
        result.acStudent = data.ac_student;
        result.rftMajor = data.rft_major;
        result.rftSchool = data.rft_school;
        result.rftTitleName = data.rft_title_name;
      }
      return result;
    });
  }

  getApplyscholarshipData(ref: ApplyScholarshipForm) {
    console.log(ref)
    const url = this.mainUrl + "apply-scholarship";
    const headers = new Headers({ "Content-Type": "application/json" });
    const body = JSON.stringify(ref.acStudent);
    console.log(body)
    return this.http.post(url, body, { headers: headers }).subscribe(
      (res: Response) => {
        this.form.acStudent = res.json().student.ac_student;
        this.form.acParent = res.json().parent;
        this.form.acSibling = res.json().sibling;
        this.form.acAddress = res.json().address;
        this.form.rftTitleName = res.json().student.rft_title;
        this.form.rftMajor = res.json().student.rft_major;
        this.form.rftSchool = res.json().student.rft_school;
        console.log(this.form)
      }
    )
  }

  getScholarshipHistory(): Observable<ApScholarshipHistory[]> {
    console.log("service.getScholarshipHistory");
    const url = this.mainUrl + "scholarship-history";
    const headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options).map((res: Response) => {
      console.log(res.json());
      return res.json();
    });
  }

  getStdLoan(): Observable<ApStudentLoanFund[]> {
    console.log("service.getStdLoan");
    const url = this.mainUrl + "student-loan-fund";
    const headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options).map((res: Response) => {
      console.log(res.json());
      return res.json();
    });
  }


  //update student
  upDateStudent(form: AcStudent, ref: string) {
    const url = this.mainUrl + "student/" + ref;
    const body = JSON.stringify(form)
    console.log(body)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(url, body, { headers: headers });
  }

  //insert application
  addApplication(form: ApApplication) {
    console.log("Begin addApplication")
    const url = this.mainUrl + "application";
    const body = JSON.stringify(form);
    const headers = new Headers({ "Content-Type": "application/json" });
    console.log(body);
    return this.http.post(url, body, { headers: headers });
  }

  addStudentLoan(form: ApStudentLoanFund[], student_ref: string) {
    for (let obj of form) {
      obj.student_ref = student_ref;
    }
    const url = this.mainUrl + "student-loan";
    const body = JSON.stringify(form);
    const headers = new Headers({ "Content-Type": "application/json" })
    console.log(body)
    return this.http.post(url, body, { headers: headers });
  }

  addSchorshipHistory(list: ApScholarshipHistory[], student_ref: string, application_ref: string) {
    for (let obj of list) {
      obj.student_ref = student_ref;
      obj.application_ref = application_ref
    }
    const url = this.mainUrl + "scholarship-history";
    const body = JSON.stringify(list);
    const headers = new Headers({ "Content-Type": "application/json" })
    console.log(body)
    return this.http.post(url, body, { headers: headers });
  }

  addFamilyFinancial(form: ApFamilyFinancial, application_ref: string) {
    form.application_ref = application_ref
    const url = this.mainUrl + "family-financial";
    const headers = new Headers({ "Content-Type": "application/json" });
    const body = JSON.stringify(form);
    console.log(body)
    return this.http.post(url, body, { headers: headers });
  }

  addDocumentUpload(list: ApDocumentUpload[], application_ref: string){
    for(let obj of list){
      obj.application_ref = application_ref;
      obj.create_user = 'phai';
      obj.update_user = 'phai';
    }
    const url = this.mainUrl + "document-upload";
    const body = JSON.stringify(list);
    const headers = new Headers({ "Content-Type": "application/json" })
    console.log(body)
    return this.http.post(url, body, { headers: headers });
  }

  addFamilyDebt(list: ApFamilyDebt[], family_financial_ref: string) {
    for(let obj of list){
      obj.family_financial_ref = family_financial_ref;
      obj.create_user = 'phai'
      obj.update_user = 'phai'
    }
    const url = this.mainUrl + "family-debt";
    const headers = new Headers({ "Content-Type": "application/json" });
    const body = JSON.stringify(list);
    console.log(body)
    return this.http.post(url, body, { headers: headers });
  }

  insertData(form: ApplyScholarshipForm) {
    this.upDateStudent(form.acStudent, form.acStudent.student_ref)
      .subscribe((res) => {
        this.addApplication(form.apApplication)
          .subscribe((res: Response) => {
            form.apApplication.application_ref = res.json().application_ref;
            this.addSchorshipHistory(form.scholarshipHistoryList, form.acStudent.student_ref, form.apApplication.application_ref)
              .subscribe((res) => {
                this.addStudentLoan(form.studentLoanFundList, form.acStudent.student_ref)
                  .subscribe((res) => {
                    this.addFamilyFinancial(form.apFamilyFinancial, form.apApplication.application_ref)
                      .subscribe((res) => {
                        form.apFamilyFinancial.family_financial_ref = res.json().family_financial_ref
                        this.addFamilyDebt(form.debtList, form.apFamilyFinancial.family_financial_ref)
                          .subscribe((res) => {
                            this.addDocumentUpload(form.fileList, form.apApplication.application_ref)
                            .subscribe((res)=>{
                              console.log("success")
                            })
                          })
                      })
                  })
              })
          })
      });
  }
}
